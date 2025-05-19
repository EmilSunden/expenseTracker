// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;
function createWindow() {
  mainWindow  = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,  // for custom title bar
    webPreferences: {
      nodeIntegration: false,  // prefer false for security
      contextIsolation: true,
      
      preload: path.join(__dirname, 'preload.js')  // Use a preload script to expose selective APIs
    },
    zoomFactor: 1.0,
    autoHideMenuBar: true,
  });

  // Depending on your build, load your renderer (React/Vite) URL
 
  // Optionally, open dev tools for debugging.
   // win.webContents.openDevTools();
  app.isPackaged
    ? mainWindow.loadFile(path.join(__dirname, "index.html")) // Prod
    : mainWindow.loadURL("http://localhost:5173/"); // Dev
    global.mainWindow = mainWindow;
     
}


app.whenReady().then(createWindow);

ipcMain.on('window-minimize', () => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;
  
  if (win.isFullScreen()) {
    win.setFullScreen(false);
    console.log("Exited full screen.");
  } else {
    win.setFullScreen(true);
    console.log("Entered full screen.");
  }
  
  console.log("Window bounds after toggle:", win.getBounds());
});


ipcMain.on('window-close', () => {
  mainWindow = BrowserWindow.getFocusedWindow();
  if (mainWindow) mainWindow.close();
});
