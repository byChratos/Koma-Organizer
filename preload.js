const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('api', {
    testInvoke: (args) => ipcRenderer.invoke('testInvoke', args),

    testSend: (args) => ipcRenderer.send('test-send', args),

    testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) }),

    loadList: (args) => ipcRenderer.invoke('loadList'),
    saveList: (args) => ipcRenderer.invoke('saveList', args),
    storeList: (list) => ipcRenderer.invoke('storeList', list),

    saveSelection: (args) => ipcRenderer.invoke('saveSelection', args),
    saveConfig: (config) => ipcRenderer.invoke('saveConfig', config),
    loadConfig: (args) => ipcRenderer.invoke('loadConfig'),

    update: (args) => ipcRenderer.invoke('update'),

    openToBrowser: (args) => ipcRenderer.invoke('openToBrowser', args),
    test: (args) => ipcRenderer.invoke('test', args),
})