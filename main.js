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
            contextIsolation: false
        }
    })

    win.loadFile('index.html');
    //win.setMenu(null);

}

//require('electron-reload')(__dirname, {
//    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
//})

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

ipcMain.on('saveToFile', (event, selectedArtifact, selectedCharacter, selectedWeapon) => {
    try{

        //* If calendar.json doesnt exist - create and paste content in
        checkIfFileExists("./calendar.json", (exists) => {
            if(exists){

                //*First load the old file data
                fs.readFile("./calendar.json", 'utf8', (err, rawdata) => {
                    if(err){
                        console.error(err);
                        return;
                    }
                    const data = JSON.parse(rawdata);

                    //* Add stuff
                    if(selectedArtifact != null){
                        var newStuff = {
                            name: selectedArtifact,
                            type: "artifact",
                        }
                        data.push(newStuff);
                    }
                    if(selectedCharacter != null){
                        var newStuff = {
                            name: selectedCharacter,
                            type: "character",
                        }
                        data.push(newStuff);
                    }
                    if(selectedWeapon != null){
                        var newStuff = {
                            name: selectedWeapon,
                            type: "weapon",
                        }
                        data.push(newStuff);
                    }

                    //* Save stuff
                    var jsonString = JSON.stringify(data, null, 2);
                    fs.writeFile("./calendar.json", jsonString, (error) => {
                        if(error){
                            console.error(error);
                            throw error;
                        }
                    });
                    event.reply('savedFile', true);
                })

            }else{
                let newData = []
                if(selectedArtifact != null){
                    var newStuff = {
                        name: selectedArtifact,
                        type: "artifact",
                    }
                    newData.push(newStuff);
                }
                if(selectedCharacter != null){
                    var newStuff = {
                        name: selectedCharacter,
                        type: "character",
                    }
                    newData.push(newStuff);
                }
                if(selectedWeapon != null){
                    var newStuff = {
                        name: selectedWeapon,
                        type: "weapon",
                    }
                    newData.push(newStuff);
                }

                var jsonString = JSON.stringify(newData, null, 2);
                fs.writeFile("./calendar.json", jsonString, (error) => {
                    if(error){
                        console.error(error);
                        throw error;
                    }
                });
            }
        })
    }catch(error){
        console.error(error);
    }
})