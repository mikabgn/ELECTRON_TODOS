// CE script seras exe avant le chargement de la page
//Accés aux API node et Electron

const { contextBridge}  = require('electron');

contextBridge.exposeInMainWorld('versions', {
    electron : process.versions.electron,
    node : process.versions.node,
    chrome : process.versions.chrome
})

console.log('chargé avec succés')