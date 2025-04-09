const { app, BrowserWindow } = require('electron')
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
   // Open the DevTools.
   win.webContents.openDevTools();
    app.isPackaged
    ? win.loadFile(path.join(__dirname, "index.html")) // Prod
    : win.loadURL("http://localhost:3000"); // Dev
  }
  app.whenReady().then(() => {
    createWindow()
  })
  