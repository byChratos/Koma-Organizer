const { app, BrowserWindow, ipcMain, Notification, shell } = require('electron');
const path = require('path');
var fs = require('fs');
const Store = require("electron-store");

const { Worker } = require("worker_threads");
const { EnkaClient } = require("enka-network-api");
const { createJsonData } = require("./src/functions/createDataList");
const { getCharIdByName, getWeaponIdByName, getArtifactIdByName, getCharacterMaterials, getWeaponMaterial } = require("./src/functions/nonModuleFunctions");

const isDev = !app.isPackaged;

const enka = new EnkaClient({ cacheDirectory: path.resolve(__dirname, "cache") });
const worker = new Worker(path.resolve(__dirname, "src", "workers", "enkaWorker.js"));
const store = new Store();
store.set("calendarList", null);

if(!fs.existsSync("./cache")){
    enka.cachedAssetsManager.cacheDirectorySetup();
    worker.postMessage("fetchContent");
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 800,
        backgroundColor: "white",
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

}

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.whenReady().then(() => {
    createWindow();

    checkIfFileExists(path.resolve(__dirname, "config.json"), (exists) => {
        if(!exists){

            const config = {
                theme: "dark",
                server: "none",
            }

            const configString = JSON.stringify(config, null, 2);
            fs.writeFile(path.resolve(__dirname, "config.json"), configString, (error) => {
                if(error){
                    console.error(error);
                }
            });
        }
    });

    createJsonData(enka);
    enka.close();

    worker.postMessage("startAutoUpdater");
})

app.on('quit', () => {
    worker.postMessage("stopAutoUpdater")
    worker.postMessage("closeEnka");
    app.quit();
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

ipcMain.handle('saveSelection', (event, args) => {
    const name = args.name;
    const type = args.type;

    const filePath = path.resolve(__dirname, "calendar.json");

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


    })
})