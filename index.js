const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs")

let win;
const createWindow = () => {
    win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
        preload: path.join(app.getAppPath(), "renderer.js")
    }
  });

  win.webContents.openDevTools();
  win.setMenu(null)
  win.loadFile("index.html");
};


try {
  require('electron-reloader')(module)
} catch (_) {}

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
        filters: [{name: "text files", extentions: ["txt"]}]
    }).then(({ filePath }) => {
        console.log("file path is " + filePath);
    })
})

