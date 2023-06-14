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
        async (
            event: IpcMainInvokeEvent,
            pathType: PathType,
            { fileName, value }: { fileName: string; value: any }
        ) => {
            try {
                const targetPath = path.join(app.getPath(pathType), fileName);
                await fs.promises.writeFile(targetPath, JSON.stringify(value));
                return { status: "success" };
            } catch (error: any) {
                return { status: "fail", error };
            }
        }
    );
    ipcMain.handle(
        "read-file",
        async (event: IpcMainInvokeEvent, pathType: PathType, { fileName }: { fileName: string }) => {
            try {
                const targetPath = path.join(app.getPath(pathType), fileName);
                const resultBuffer = await fs.promises.readFile(targetPath);
                const result = JSON.parse(resultBuffer.toString());
                return { status: "success", data: result };
            } catch (error: any) {
                return { status: "fail", error };
            }
        }
    );
    ipcMain.handle(
        "delete-file",
        async (event: IpcMainInvokeEvent, pathType: PathType, { fileName }: { fileName: string }) => {
            try {
                const targetPath = path.join(app.getPath(pathType), fileName);
                await fs.promises.unlink(targetPath);
                return { status: "success" };
            } catch (error: any) {
                return { status: "fail", error };
            }
        }
    );
}

export default registFileHandler;
