// CE script seras exe avant le chargement de la page
//Accés aux API node et Electron

const { contextBridge, ipcRenderer}  = require('electron');

contextBridge.exposeInMainWorld('versions', {
    //fonction qui recup les versions via IPC
    getVersions: () => ipcRenderer.invoke('get-versions')
})

console.log('Preload chargé avec succès')