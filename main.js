// Processus principale

const {app, BrowserWindow, ipcMain, Menu} = require("electron")
const path = require('path')
const electron = require("electron");

let window;

//.Créer la fenetre principale

function createWindow () {
    window = new BrowserWindow({
        width : 800,
        height : 600 ,
        webPreferences: {
            nodeIntegration: false, // acces au api node depuis le rendu
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname,'src/js/preload.js')
        }
    })

    // Création du menu
    createMenu()

    window.loadFile('src/pages/index.html');

}

//Fonction permettant de créé un menu perso
function createMenu(){
 //Créer un tableau qui representera la structure du menu
    const templat = [
        {
            label: "App",
            submenu: [
                {
                    label: "Versions",
                    click: () => window.loadFile('src/pages/index.html')
                },
                {
                  type: 'separator'
                },
                {
                    label: "Quitter",
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q' ,
                    click: () => app.quit()
                }
            ]
        },
        {
            label: "Tâche",
            submenu: [
                {
                    label: "Lister",
                    click: () => window.loadFile('src/pages/list-taches.html')
                },
                {
                    type: 'separator'
                },
                {
                    label: "Ajouter",
                    click: () => window.loadFile('src/pages/ajout-taches.html')
                }
            ]
        }
    ]

    // Créer le menu à partir du modéle
    const menu = Menu.buildFromTemplate(templat)
    // Définir e menu comme etant celui de l'appli
    Menu.setApplicationMenu(menu)

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

// Ecouter sur le canal 'get-versions'
ipcMain.handle('get-versions', () => {
    //return un objet contenant la version des outils
    return {
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome
    }
})