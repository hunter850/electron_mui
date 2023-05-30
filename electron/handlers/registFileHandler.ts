import { app, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
// type
import type { IpcMainInvokeEvent } from "electron";
import type { PathType } from "../electron";

function registFileHandler() {
    ipcMain.handle("get-path", (event: IpcMainInvokeEvent, pathType: PathType) => {
        return app.getPath(pathType);
    });
    ipcMain.handle(
        "write-file",
        async (event: IpcMainInvokeEvent, pathType: PathType, { fileKey, value }: { fileKey: string; value: any }) => {
            try {
                const targetPath = path.join(app.getPath(pathType), `electron_mui_${fileKey}.json`);
                await fs.promises.writeFile(targetPath, JSON.stringify(value));
                return "success";
            } catch (error: any) {
                return "fail";
            }
        }
    );
    ipcMain.handle(
        "read-file",
        async (event: IpcMainInvokeEvent, pathType: PathType, { fileKey }: { fileKey: string }) => {
            try {
                const targetPath = path.join(app.getPath(pathType), `electron_mui_${fileKey}.json`);
                const resultBuffer = await fs.promises.readFile(targetPath);
                const result = JSON.parse(resultBuffer.toString());
                return { status: "success", data: result };
            } catch (error: any) {
                return { status: "fail", errorMessage: error.message };
            }
        }
    );
    ipcMain.handle(
        "delete-file",
        async (event: IpcMainInvokeEvent, pathType: PathType, { fileKey }: { fileKey: string }) => {
            try {
                const targetPath = path.join(app.getPath(pathType), `electron_mui_${fileKey}.json`);
                await fs.promises.unlink(targetPath);
                return { status: "success" };
            } catch (error: any) {
                return { status: "fail", errorMessage: error.message };
            }
        }
    );
}

export default registFileHandler;
