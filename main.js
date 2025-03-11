// Processus principale

const {app, BrowserWindow} = require("electron")
const path = require('path')

//.Créer la fenetre principale

function createWindow () {
    const window = new BrowserWindow({
        width : 800,
        height : 600 ,
        webPreferences: {
            nodeIntegration: false, // acces au api node depuis le rendu
            contextIsolation: true,
            preload: path.join(__dirname,'src/js/preload.js')
        }
    })

    window.loadFile('src/pages/index.html');

}

//Attendre l'initialisation del'application au demarrage
app.whenReady().then( () => {

    console.log("App init")
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})