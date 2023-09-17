const { parentPort } = require('worker_threads');
const { EnkaClient } = require("enka-network-api");
const path = require("path")

const enka = new EnkaClient({ cacheDirectory: path.resolve(__dirname, "..", "..", "cache"), defaultLanguage: "en" })

parentPort.on('message', (message) => {

    if(message === 'fetchContent'){

        // ! Downloads all contents into the cache
        parentPort.postMessage("updateStart");
        enka.cachedAssetsManager.fetchAllContents().then(() => parentPort.postMessage("updateEnd"));

    }else if(message == 'updateContent'){
        // ! Updates content of the cache
        enka.cachedAssetsManager.updateContents({
            onUpdateStart: async () => {
                updating = true;
                parentPort.postMessage("updateStart");
            },
            onUpdateEnd: async () => {
                updating = false;
                parentPort.postMessage("updateEnd");
            }
        }).then(updated => {
            if(!updated){
                parentPort.postMessage("noUpdates");
            }
        })
    }else if(message === 'closeEnka'){

        // ! Closes the EnkaClient
        enka.close();

    }
});