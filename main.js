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
let updateDownloaded = false;

const enka = new EnkaClient({ cacheDirectory: path.resolve(__dirname, "cache") });

const store = new Store();

const userStore = new Store({ name: "userConfig" });
const genshinStore = new Store({ name: "genshinData" });

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
    createJsonData(enka, genshinStore);

    autoUpdater.checkForUpdates();

    //enka.close();
})

function electronStore(){
    //! For migrating from one file storing all data the app uses to userFile and genshinDataFile seperately
    let calendarList = userStore.get("calendarList", false);

    if(!calendarList){
        const cl = store.get("calendarList", false);
        if(cl){
            userStore.set("calendarList", cl);
        }else{
            userStore.set("calendarList", []);
        }
    }

    let config = userStore.get("config", false);
    if(!config){
        config = {
            theme: "dark",
            server: "None",
        };
        userStore.set("config", config);
    }

    let update = userStore.get("update", "not");
    if(update == "not"){
        userStore.set("update", false);
    }

    let lastCheck = userStore.get("lastCheck", false);
    if(!lastCheck){
        userStore.set("lastCheck", null);
    }

    let lastCheckKoma = userStore.get("lastCheckKoma", false);
    if(!lastCheckKoma){
        userStore.set("lastCheckKoma", null);
    }

    userStore.set("firstTime", true);
}

ipcMain.handle("getVersion", (event) => {
    return app.getVersion();
})

ipcMain.handle("storeGet", (event, args) => {
    const file = args.file;
    const item = args.item;

    if(file == "genshin"){
        return genshinStore.get(item);
    }else{
        return userStore.get(item);
    }
})

ipcMain.handle("storeSet", (event, args) => {
    const file = args.file;
    const item = args.item;
    const value = args.value;

    if(file == "genshin"){
        genshinStore.set(item, value);
    }else{
        userStore.set(item, value);
    }
    return true;
})

ipcMain.handle("log", (event, args) => {
    log.info(args.message);
})

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {

    log.info("Koma update available");

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
            message: "Update downloaded!",
            detail: "Restart Koma to make the changes take effect"
        }

        updateDownloaded = true;
        dialog.showMessageBox(dialogOpts);
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

    let first = userStore.get("firstTime");

    if(first){
        userStore.set("firstTime", false);
    }else{
        dialog.showMessageBox(dialogOpts);
    }
})

app.on('quit', () => {

    log.info("Closing app....");

    log.info(" ");

    enka.close();

    if(updateDownloaded){
        autoUpdater.quitAndInstall();
    }else{
        app.quit();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

ipcMain.handle('updateKoma', (event) => {
    
    let lastCheck = userStore.get("lastCheckKoma");
    let nowUnix = Math.floor(Date.now() / 1000);

    if(lastCheck == null || (nowUnix - lastCheck) > 30){

        log.info("Looking for Koma Updates");

        userStore.set("lastCheckKoma", nowUnix);

        autoUpdater.checkForUpdates();

        return true;
    }else{
        return "wait " + (30 - (nowUnix - lastCheck));
    }

});

ipcMain.handle('loadList', (event, args) => {

    list = userStore.get("calendarList");

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

        userStore.set("calendarList", list);
        return true;

    }catch(error){
        console.error(error);
        return false;
    }

});

ipcMain.handle('storeList', (event, list) => {
    userStore.set("calendarList", list);
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

    let data = userStore.get("calendarList");

    if(!isDuplicate(name, data)){
        if(type == "character"){
            var id = getCharIdByName(name, genshinStore.get("charData"));
            var materials = getCharacterMaterials(id, userStore.get("charData"));

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
            var id = getWeaponIdByName(name, genshinStore.get("weaponData"));
            var material = getWeaponMaterial(id, genshinStore.get("weaponData"));

            data.push({
                name: name,
                id: id,
                type: "weapon",
                material: material,
            });
        }else{
            var id = getArtifactIdByName(name, genshinStore.get("artifactsData"));
            
            data.push({
                name: name,
                id: id,
                type: "artifact",
            });
        }
    }else{
        return false;
    }

    userStore.set("calendarList", data);
    return true;
});