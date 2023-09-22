const { app, BrowserWindow, ipcMain, Notification, shell, dialog } = require('electron');
const path = require('path');
var fs = require('fs');
const Store = require("electron-store");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

const { Worker } = require("worker_threads");
const { EnkaClient } = require("enka-network-api");
const { createJsonData } = require("./src/functions/createDataList");
const { getCharIdByName, getWeaponIdByName, getArtifactIdByName, getCharacterMaterials, getWeaponMaterial } = require("./src/functions/nonModuleFunctions");

const isDev = !app.isPackaged;

let updateInterval = null;
let updateCheck = false;
let updateFound = false;
let updateNotAvailable = false;

const enka = new EnkaClient({ cacheDirectory: path.resolve(__dirname, "cache") });
const worker = new Worker(path.resolve(__dirname, "src", "workers", "enkaWorker.js"));
const store = new Store();

//TODO Store all data in electron store

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 800,
        backgroundColor: "white",
        icon: path.join(__dirname, "src", "Images", "win.ico"),
        title: "Koma Organizer",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            nodeIntegrationInWorker: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true
        }
    })

    win.loadFile('index.html');
    //win.setMenu(null);

    win.on("closed", () => {
        win = null;
    })

}

if(isDev){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

app.whenReady().then(() => {
    createWindow();

    //* Creates variables in the config.json
    electronStore();

    //* Gets the Genshin data into the config.json
    createJsonData(enka, store);

    updateInterval = setInterval(() => autoUpdater.checkForUpdates(), 600000);

    checkIfFileExists(path.resolve(__dirname, "cache"), (exists) => {
        if(!exists){
            console.log(__dirname, "cache");
            enka.cachedAssetsManager.cacheDirectorySetup();
            worker.postMessage("fetchContent");
        }
    });

    if(enka.cachedAssetsManager.hasAllContents()){
        //worker.postMessage("updateContent");
    }else{
        worker.postMessage("fetchContent");
    }

    enka.close();
})

function electronStore(){
    let calendarList = store.get("calendarList", false);
    if(!calendarList){
        store.set("calendarList", []);
    }

    let config = store.get("config", false);
    if(!config){
        config = {
            theme: "dark",
            server: "None",
        };
        store.set("config", config);
    }

    let update = store.get("update", "not");
    if(update == "not"){
        store.set("update", false);
    }

    let lastCheck = store.get("lastCheck", false);
    if(!lastCheck){
        store.set("lastCheck", null);
    }
}

//! Logs from Multithreading
worker.on("message", (msg) => {
    if(msg.startsWith("LOGGING:")){
        log.info(msg);
    }
})


//!Used
ipcMain.handle("storeGet", (event, args) => {
    const item = args.item;
    return store.get(item);
})

//!Used
ipcMain.handle("storeSet", (event, args) => {
    const item = args.item;
    const value = args.value;
    store.set(item, value);
    return true;
})

ipcMain.handle("log", (event, args) => {
    log.info(args.message);
})

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: `${autoUpdater.channel} Update Available`,
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: `A new ${autoUpdater.channel} version download started.`
    };

    if(!updateCheck){
        updateInterval = null;
        dialog.showMessageBox(dialogOpts);
        updateCheck = true;
    }
})

autoUpdater.on("update-downloaded", (_event) => {
    if(!updateFound){
        updateInterval = null;
        updateFound = true;

        setTimeout(() => {
            autoUpdater.quitAndInstall();
        }, 3500);
    }
})

autoUpdater.on("update-not-available", (_event) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: `Update not available for ${autoUpdater.channel}`,
        message: "ABC",
        detail: `Update not available for ${autoUpdater.channel}`
    }

    if(!updateNotAvailable){
        updateNotAvailable = true;
        dialog.showMessageBox(dialogOpts);
    }
})

app.on('quit', () => {
    worker.postMessage("stopAutoUpdater")
    worker.postMessage("closeEnka");
    app.quit();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});



ipcMain.handle('update', (event) => {

    let lastCheck = store.get("lastCheck");
    let nowUnix = Math.floor(Date.now() / 1000);

    if(lastCheck == null || (nowUnix - lastCheck) > 30){

        store.set("lastCheck", nowUnix);

        return new Promise((resolve, reject) => {
            worker.on('message', (msg) => {
                if(msg === "noUpdates" || msg === "updateEnd"){
                    store.set("update", false);
                    resolve(msg);
                }else if(msg === "updateStart"){
                    store.set("update", true);
                }
            });

            worker.on('error', (err) => {
                reject(err);
            });

            let updating = store.get("update");
            if(!updating){
                worker.postMessage("updateContent");
            }
        })
    }else{
        return "wait " + (30 - (nowUnix - lastCheck));
    }

})

ipcMain.handle('loadList', (event, args) => {

    list = store.get("calendarList");

    if(list == null){
        return "empty";
    }else{
        return list;
    }
});

ipcMain.handle('saveList', (event, list) => {

    try{
        const filePath = path.resolve(__dirname, "calendar.json");
        const jsonString = JSON.stringify(list, null, 2);

        fs.writeFile(filePath, jsonString, (error) => {
            if(error){
                console.error(error);
                return false;
            }
        });

        store.set("calendarList", list);
        return true;

    }catch(error){
        console.error(error);
        return false;
    }

});

ipcMain.handle('storeList', (event, list) => {
    store.set("calendarList", list);
});

ipcMain.handle('openToBrowser', (event, url) => {
    shell.openExternal(url);
})

ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
})

function checkIfFileExists(filePath, callback){
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if(err){
            //*File doesnt exist
            callback(false);
        }else{
            //*File exists
            callback(true);
        }
    })
}

//* Checks if a Character, Weapon or Artifact is already inside of the calendar
function isDuplicate(name, data){
    for(const element of data){
        if(name === element.name){
            //*Element already exists in file
            return true;
        }
    }
    //*Element doesnt exist in file
    return false;
}

//!Used
ipcMain.handle('saveSelection', (event, args) => {

    log.info("Save Selection");

    const name = args.name;
    const type = args.type;

    let data = store.get("calendarList");

    if(!isDuplicate(name, data)){
        if(type == "character"){
            var id = getCharIdByName(name, store.get("charData"));
            var materials = getCharacterMaterials(id, store.get("charData"));

            data.push({
                name: name,
                id: id,
                type: "character",
                boss: true,
                bossId: materials["boss"],
                talents: true,
                talentsId: materials["talent"],
            });

        }else if(type == "weapon"){
            var id = getWeaponIdByName(name, store.get("weaponData"));
            var material = getWeaponMaterial(id, store.get("weaponData"));

            data.push({
                name: name,
                id: id,
                type: "weapon",
                material: material,
            });
        }else{
            var id = getArtifactIdByName(name, store.get("artifactsData"));
            
            data.push({
                name: name,
                id: id,
                type: "artifact",
            });
        }
    }

    store.set("calendarList", data);
    return true;


    /*const filePath = path.resolve(__dirname, "calendar.json");

    checkIfFileExists(filePath, (exists) => {
        if(!exists){
            var jsonString = JSON.stringify([], null, 2);
            fs.writeFile(filePath, jsonString, (error) => {
                if(error){
                    console.error(error);
                    return false;
                }
            });
        }

        fs.readFile(filePath, (err, rawdata) => {
            if(err){
                console.error(err);
                return;
            }
            const data = JSON.parse(rawdata);

            if(!isDuplicate(name, data)){
                if(type == "character"){
                    var id = getCharIdByName(name);
                    var materials = getCharacterMaterials(id);

                    data.push({
                        name: name,
                        id: id,
                        type: "character",
                        boss: true,
                        bossId: materials["boss"],
                        talents: true,
                        talentsId: materials["talent"],
                    });

                }else if(type == "weapon"){
                    var id = getWeaponIdByName(name);
                    var material = getWeaponMaterial(id);

                    data.push({
                        name: name,
                        id: id,
                        type: "weapon",
                        material: material,
                    });
                }else{
                    var id = getArtifactIdByName(name);
                    
                    data.push({
                        name: name,
                        id: id,
                        type: "artifact",
                    });
                }
            }
            
            var jsonString = JSON.stringify(data, null, 2);
            fs.writeFile(filePath, jsonString, (error) => {
                if(error){
                    console.error(error);
                    return false;
                }
            });

            store.set("calendarList", data);
            return true;
        })


    })*/
})

ipcMain.handle('saveConfig', (event, config) => {
    let configPath = path.resolve(__dirname, "config.json");
    const jsonString = JSON.stringify(config, null, 2);
    fs.writeFile(configPath, jsonString, (error) => {
        if(error){
            console.error(error);
            return false;
        }
        store.set("config", config);
        return true;
    });
})

ipcMain.handle('loadConfig', (event) => {
    let config = store.get("config");

    if(config == null){
        return "empty";
    }else{
        return config;
    }
})

ipcMain.handle('test', (event) => {
    console.log("TEST");
})