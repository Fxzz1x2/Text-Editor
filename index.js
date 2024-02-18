const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs")

try {
  require('electron-reloader')(module)
} catch (_) {}

let win;
const createWindow = () => {
    win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
        preload: path.join(app.getAppPath(), "renderer.js"),
        nodeIntegration: true
    }
  });

  win.webContents.openDevTools();
  win.setMenu(null)
  win.loadFile("index.html");
};




app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


ipcMain.on("create-document", () => {
    dialog.showSaveDialog(win, {
        filters: [{name: "text files", extensions: ["txt"]}]
    }).then(({ filePath }) => {
        fs.writeFile(filePath, "", (error) => {
            if(error) { 
                console.log(error)
            } else {
                win.webContents.send('document-created', filePath)
            }
        })
    })
})


ipcMain.on("open-document", () => {
    dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{name: "text files", extensions: ["txt"]}]
    }).then(({ filePaths }) => {
        const filePath = filePaths[0];

        fs.readFile(filePath, "utf8", (error, content) => {
            if(error) {
                console.log(error)
            } else {
                win.webContents.send("document-opened" , {filePath, content})
            }
        })
    })  
})


