import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false, // disable initial window from showing
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    if (app.isPackaged) {
        win.loadFile("./build/index.html");
    } else {
        win.loadURL("http://localhost:3000");
    }

    /*--------------------------- check window size --------------------------*/
    win.on("maximize", () => {
        win.webContents.send("window-size-status", "maximize");
    });

    win.on("unmaximize", () => {
        win.webContents.send("window-size-status", "unmaximize");
    });

    ipcMain.handle("check-window-is-maximize", () => {
        return win.isMaximized();
    });

    ipcMain.handle("resize-window", (event, action) => {
        switch (action) {
            case "minimize":
                win.minimize();
                break;
            case "maximize":
                win.maximize();
                break;
            case "unmaximize":
                win.unmaximize();
                break;
            default:
                break;
        }
    });

    ipcMain.handle("close-window", () => {
        win.close();
    });

    // show window without setting focus
    win.showInactive();
    // Open the DevTools.
    // win.webContents.openDevTools();
};

app.whenReady().then(() => {
    if (require("electron-squirrel-startup")) app.quit();
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
