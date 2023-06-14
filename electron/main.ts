import { app, BrowserWindow } from "electron";
import * as path from "path";
// lib
import registGlobalHandler from "./handlers/registGlobalHandler";
import registWindowSizeStatusHandler from "./handlers/registWindowSizeStatusHandler";
import registFileHandler from "./handlers/registFileHandler";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false, // disable initial window from showing
        titleBarStyle: "hidden",
        icon: "../src/assets/icon.png",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    if (app.isPackaged) {
        win.loadFile("./build/index.html");
    } else {
        win.loadURL("http://localhost:3300");
    }

    registGlobalHandler();
    registWindowSizeStatusHandler(win);
    registFileHandler();

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
