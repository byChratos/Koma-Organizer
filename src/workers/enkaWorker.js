const { parentPort } = require('worker_threads');
const { EnkaClient } = require("enka-network-api");

const enka = new EnkaClient({ cacheDirectory: "../../cache", defaultLanguage: "en" })

parentPort.on('message', (message) => {

    if(message === 'fetchContent'){

        // ! Downloads all contents into the cache
        enka.cachedAssetsManager.fetchAllContents();

    }else if(message === 'startAutoUpdater'){

        enka.cachedAssetsManager.activateAutoCacheUpdater({
            instant: true,
            timeout: 60 * 60 * 1000, // 1 hour interval
            onUpdateStart: async () => {
                console.log("Updating Genshin Data...");
            },
            onUpdateEnd: async () => {
                enka.cachedAssetsManager.refreshAllData();
                console.log("Updating Completed!");
            }
        });

    }else if(message === 'stopAutoUpdater'){

        enka.cachedAssetsManager.deactivateAutoCacheUpdater();

    }else if(message === 'closeEnka'){

        // ! Closes the EnkaClient
        enka.close();

    }
});