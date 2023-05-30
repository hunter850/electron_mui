import { contextBridge, ipcRenderer } from "electron";
// types
import type { IpcRendererEvent } from "electron";

export const electronContext = {
    ipcRenderer: {
        invoke: ipcRenderer.invoke,
        postMessage: ipcRenderer.postMessage,
        send: ipcRenderer.send,
        sendSync: ipcRenderer.sendSync,
        sendTo: ipcRenderer.sendTo,
        sendToHost: ipcRenderer.sendToHost,
    },
    listenWindowSizeStatus: (cb: (message: string) => void) => {
        function triggerHandler(event: IpcRendererEvent, message: string) {
            cb(message);
        }
        ipcRenderer.on("window-size-status", triggerHandler);
        return () => {
            ipcRenderer.removeListener("window-size-status", triggerHandler);
        };
    },
    // tempPath: app.getPath("temp"),
};

contextBridge.exposeInMainWorld("electron", electronContext);
