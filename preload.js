const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('api', {
    testInvoke: (args) => ipcRenderer.invoke('testInvoke', args),

    log: (args) => ipcRenderer.invoke("log", args),
    getVersion: (args) => ipcRenderer.invoke("getVersion"),

    storeGet: (args) => ipcRenderer.invoke("storeGet", args),
    storeSet: (args) => ipcRenderer.invoke("storeSet", args),

    loadList: (args) => ipcRenderer.invoke('loadList'),
    saveList: (args) => ipcRenderer.invoke('saveList', args),
    storeList: (list) => ipcRenderer.invoke('storeList', list),

    saveSelection: (args) => ipcRenderer.invoke('saveSelection', args),
    saveConfig: (config) => ipcRenderer.invoke('saveConfig', config),
    loadConfig: (args) => ipcRenderer.invoke('loadConfig'),

    updateKoma: (args) => ipcRenderer.invoke('updateKoma'),

    openToBrowser: (args) => ipcRenderer.invoke('openToBrowser', args),
})