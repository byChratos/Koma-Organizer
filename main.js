const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
var fs = require('fs');

const { Worker } = require("worker_threads");
const { EnkaClient } = require("enka-network-api");
const { createJsonData } = require("./src/functions/createDataList");
const { getCharIdByName, getWeaponIdByName, getArtifactIdByName, getCharacterMaterials, getWeaponMaterial } = require("./src/functions/nonModuleFunctions");

const isDev = !app.isPackaged;

const enka = new EnkaClient({ cacheDirectory: path.resolve(__dirname, "cache") });
const worker = new Worker(path.resolve(__dirname, "src", "workers", "enkaWorker.js"));

if(!fs.existsSync("./cache")){
    enka.cachedAssetsManager.cacheDirectorySetup();
    worker.postMessage("fetchContent");
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 800,
        minHeight: 600,
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

ipcMain.on('saveToFile', (event, selectedArtifact, selectedCharacter, selectedWeapon) => {
    try{

        const filePath = path.resolve(__dirname, "calendar.json")

        //* If calendar.json doesnt exist - create and paste content in
        checkIfFileExists(filePath, (exists) => {
            if(exists){

                //*First load the old file data
                fs.readFile(filePath, (err, rawdata) => {
                    if(err){
                        console.error(err);
                        return;
                    }
                    const data = JSON.parse(rawdata);

                    //*Add stuff
                    if((selectedArtifact != null) && !isDuplicate(selectedArtifact, data)){

                        var id = getArtifactIdByName(selectedArtifact);

                        var newArtifact = {
                            name: selectedArtifact,
                            id: id,
                            type: "artifact",
                        }
                        data.push(newArtifact);
                    }
                    if((selectedCharacter != null) && !isDuplicate(selectedCharacter, data)){
                        
                        var id = getCharIdByName(selectedCharacter);
                        var materials = getCharacterMaterials(id);

                        var newCharacter = {
                            name: selectedCharacter,
                            id: id,
                            type: "character",
                            boss: materials["boss"],
                            talents: materials["talent"],
                        }
                        data.push(newCharacter);
                    }
                    if((selectedWeapon != null) && !isDuplicate(selectedWeapon, data)){

                        var id = getWeaponIdByName(selectedWeapon);
                        var material = getWeaponMaterial(id);

                        var newWeapon = {
                            name: selectedWeapon,
                            id: id,
                            type: "weapon",
                            material: material,
                        }
                        data.push(newWeapon);
                    }

                    //TODO Callback that an Element was a duplicate

                    //* Save stuff
                    var jsonString = JSON.stringify(data, null, 2);
                    fs.writeFile(filePath, jsonString, (error) => {
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

                    var id = getArtifactIdByName(selectedArtifact);

                    var newArtifact = {
                        name: selectedArtifact,
                        id: id,
                        type: "artifact",
                    }
                    newData.push(newArtifact);
                }
                if(selectedCharacter != null){

                    var id = getCharIdByName(selectedCharacter);
                    var materials = getCharacterMaterials(id);

                    var newCharacter = {
                        name: selectedCharacter,
                        id: id,
                        type: "character",
                        boss: materials["boss"],
                        talents: materials["talent"],
                    }
                    newData.push(newCharacter);
                }
                if(selectedWeapon != null){

                    var id = getWeaponIdByName(selectedWeapon);
                    var material = getWeaponMaterial(id);

                    var newWeapon = {
                        name: selectedWeapon,
                        id: id,
                        type: "weapon",
                        material: material,
                    }
                    newData.push(newWeapon);
                }

                var jsonString = JSON.stringify(newData, null, 2);
                fs.writeFile(filePath, jsonString, (error) => {
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