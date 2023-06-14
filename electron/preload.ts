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
    isMac: async () => {
        return (await ipcRenderer.invoke("is-mac")) as Promise<boolean>;
    },
    isWindows: async () => {
        return (await ipcRenderer.invoke("is-windows")) as Promise<boolean>;
    },
    isLinux: async () => {
        return (await ipcRenderer.invoke("is-linux")) as Promise<boolean>;
    },
};

contextBridge.exposeInMainWorld("electron", electronContext);
