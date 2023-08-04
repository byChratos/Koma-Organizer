const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
var fs = require('fs')
const { EnkaClient } = require("enka-network-api");

const { getCharacterList, getWeaponsList, getArtifactList } = require('./src/functions/getDataList')

const isDev = !app.isPackaged;


const enka = new EnkaClient({ cacheDirectory: "./cache" });
// ! Creates Cache folder if there is no cache folder already
if(!fs.existsSync("./cache")){
    enka.cachedAssetsManager.cacheDirectorySetup();
};

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');
    //win.setMenu(null);

    // ! Get contents if there is missing contents
    if(!enka.cachedAssetsManager.hasAllContents()){
        // TODO Make thread do that?
        enka.cachedAssetsManager.fetchAllContents();
    }

    // ! Check for update
    if(enka.cachedAssetsManager.checkForUpdates()){
        enka.cachedAssetsManager.updateContents();
    }

}

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.whenReady().then(() => {
    createWindow();

    // * Enka close
    enka.close();

    //Retrieving the list of all characters
    getCharacterList().then(chars => {

        let charactersArray = []

        for(let i = 0; i < chars.length; i++){
            const newChar = {
                id: i,
                text: chars[i]
            };
            charactersArray.push(newChar)
        }

        const jsonString = JSON.stringify(charactersArray, null, 2);
        fs.writeFileSync('./src/data/characters.json', jsonString);
    })

    //Retrieving the list of all weapons
    getWeaponsList().then(weapons => {

        let weaponsArray = []

        for(let i = 0; i < weapons.length; i++){
            const newWeapon = {
                id: i,
                text: weapons[i]
            };
            weaponsArray.push(newWeapon)
        }

        const jsonString = JSON.stringify(weaponsArray, null, 2);
        fs.writeFileSync('./src/data/weapons.json', jsonString);
    })

    //Retrieving the list of all the weapons
    getArtifactList().then(artifacts => {

        let artifactArray = []

        for(let i = 0; i < artifacts.length; i++){
            const newArtifact = {
                id: i,
                text: artifacts[i]
            };
            artifactArray.push(newArtifact)
        }

        const jsonString = JSON.stringify(artifactArray, null, 2);
        fs.writeFileSync('./src/data/artifacts.json', jsonString);
    })
})

//Not working idk why
ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
})