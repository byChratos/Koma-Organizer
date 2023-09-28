const { EnkaClient } = require("enka-network-api");

const enka = new EnkaClient({ cacheDirectory: "./cache" });

enka.cachedAssetsManager.checkForUpdates().then(updates => {
    if(updates){
        enka.updateContents();
    }else{
        console.log("No Updates found!");
    }
});

enka.close();