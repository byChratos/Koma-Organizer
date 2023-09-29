const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
var fs = require('fs');
const Store = require("electron-store");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

const { EnkaClient } = require("enka-network-api");
const { createJsonData } = require("./src/functions/createDataList");
const { getCharIdByName, getWeaponIdByName, getArtifactIdByName, getCharacterMaterials, getWeaponMaterial } = require("./src/functions/nonModuleFunctions");

const isDev = !app.isPackaged;

let updateCheck = false;
let updateFound = false;

const enka = new EnkaClient({ cacheDirectory: path.resolve(__dirname, "cache") });
const store = new Store();

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
    
    if(!isDev) win.setMenu(null);

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

    log.info("Program started.");

    //* Creates variables in the config.json
    electronStore();

    //* Gets the Genshin data into the config.json
    createJsonData(enka, store);

    autoUpdater.checkForUpdates();

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

    let lastCheckKoma = store.get("lastCheckKoma", false);
    if(!lastCheckKoma){
        store.set("lastCheckKoma", null);
    }

    store.set("firstTime", true);
}

ipcMain.handle("getVersion", (event) => {
    return app.getVersion();
})

ipcMain.handle("storeGet", (event, args) => {
    const item = args.item;
    return store.get(item);
})

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

    log.info("Koma update available");
    log.info("Release Name: " + releaseName);
    log.info("Release Notes: " + releaseNotes);

    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: `Update Available`,
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: `A new version download started. You will get a notification once the update finishes downloading. Please do not quit`
    };

    if(!updateCheck){
        updateInterval = null;
        dialog.showMessageBox(dialogOpts);
        updateCheck = true;
    }
})

autoUpdater.on("update-downloaded", (_event) => {

    log.info("Update downloaded");

    if(!updateFound){
        updateInterval = null;
        updateFound = true;

        const dialogOpts = {
            type: 'info',
            buttons: ['Ok'],
            title: `Update finished downloading!`,
            message: "Restart Koma to make the updates take effect",
            detail: "Update downloaded"
        }

        dialog.showMessageBox(dialogOpts);

        /*setTimeout(() => {
            autoUpdater.quitAndInstall();
        }, 10000);*/
    }
})

autoUpdater.on("update-not-available", (_event) => {

    log.info("No Koma Updates available");

    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: `Update not available`,
        message: "No Updates found",
        detail: `Update not available`
    }

    let first = store.get("firstTime");

    if(first){
        store.set("firstTime", false);
    }else{
        dialog.showMessageBox(dialogOpts);
    }
})

app.on('quit', () => {

    log.info("Closing app....");

    //worker.postMessage("stopAutoUpdater")
    //worker.postMessage("closeEnka");

    log.info(" ");

    app.quit();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

ipcMain.handle('updateKoma', (event) => {
    
    let lastCheck = store.get("lastCheckKoma");
    let nowUnix = Math.floor(Date.now() / 1000);

    if(lastCheck == null || (nowUnix - lastCheck) > 30){

        log.info("Looking for Koma Updates");

        store.set("lastCheckKoma", nowUnix);

        autoUpdater.checkForUpdates();

        return true;
    }else{
        return "wait " + (30 - (nowUnix - lastCheck));
    }

});

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
    log.info("Opening link to browser");
    shell.openExternal(url);
});

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
    }else{
        return false;
    }

    store.set("calendarList", data);
    return true;
});