import { ipcMain } from "electron";
import * as os from "os";

function registGlobalHandler() {
    ipcMain.handle("is-mac", () => {
        return os.platform() === "darwin";
    });
    ipcMain.handle("is-windows", () => {
        return os.platform() === "win32";
    });
    ipcMain.handle("is-linux", () => {
        return os.platform() === "linux";
    });
}

export default registGlobalHandler;
