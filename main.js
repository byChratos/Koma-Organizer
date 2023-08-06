const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
var fs = require('fs')

const { Worker } = require("worker_threads");
const { EnkaClient } = require("enka-network-api");
const { createJsonData } = require("./src/functions/createDataList");

const isDev = !app.isPackaged;

const enka = new EnkaClient({ cacheDirectory: "./cache" });
const worker = new Worker("./src/workers/enkaWorker.js");

if(!fs.existsSync("./cache")){
    enka.cachedAssetsManager.cacheDirectorySetup();
    worker.postMessage("fetchContent");
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
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

    createJsonData(enka);
    enka.close();

    worker.postMessage("startAutoUpdater");
})

app.on('quit', () => {
    worker.postMessage("stopAutoUpdater")
    worker.postMessage("closeEnka");
    app.quit();
})


ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
})

ipcMain.on('writeFile', (event, filePath, fileContent) => {
    try{
        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, "[]");
        }

        fs.writeFileSync(filePath, fileContent);
        event.reply('wroteFile', true);
    }catch(err){
        event.reply('wroteFile', false);
    }
})

ipcMain.on('loadFile', (event, filePath) => {
    try{

        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, "[]");
        }

        const rawdata = fs.readFileSync(filePath);
        const data = JSON.parse(rawdata);
        event.reply('loadedFile', true, data);
    }catch(err){
        event.reply('loadedFile', false, '');
    }
})