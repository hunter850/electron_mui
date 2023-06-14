import { Fragment, useEffect } from "react";
// redux
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectCount, incrementByAmount } from "@/features/countSlice";
// utils
import { enqueueSnackbar } from "notistack";
const { ipcRenderer } = window.electron;
// types

function Home(): JSX.Element {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    function clickHandler() {
        dispatch(incrementByAmount(1));
    }
    function alertHandler() {
        enqueueSnackbar("Hello World Hello World Hello World Hello World Hello World", {
            variant: "info",
        });
    }
    async function writeGreetingHandler() {
        const result = await ipcRenderer.invoke("write-file", "appData", {
            fileName: "electron_mui_test.json",
            value: { greeting: "Hello World" },
        });
        if (result.status === "success") {
            enqueueSnackbar("write file successfully", { variant: "success" });
        } else {
            enqueueSnackbar("failed to write the file", { variant: "error" });
        }
    }
    async function readGreetingHandler() {
        const result = await ipcRenderer.invoke("read-file", "appData", { fileName: "electron_mui_test.json" });
        if (result.status === "success") {
            console.log("reading data: ", result.data);
        } else {
            enqueueSnackbar(`failed to read the file: ${result.error.message}`, { variant: "error" });
        }
    }
    async function deleteGreetingHandler() {
        const result = await ipcRenderer.invoke("delete-file", "appData", { fileName: "electron_mui_test.json" });
        if (result.status === "success") {
            enqueueSnackbar("delete file successfully", { variant: "success" });
        } else {
            enqueueSnackbar(`failed to delete the file: ${result.error.message}`, { variant: "error" });
        }
    }
    useEffect(() => {
        (async () => {
            const result = await ipcRenderer.invoke("get-path", "appData");
            console.log("appData path", result);
        })();
    }, []);
    return (
        <Fragment>
            <h1>Home</h1>
            <h1>{count}</h1>
            <button onClick={clickHandler}>click</button>
            <button onClick={alertHandler}>alert</button>
            <button onClick={writeGreetingHandler}>write greeting</button>
            <button onClick={readGreetingHandler}>read file</button>
            <button onClick={deleteGreetingHandler}>delete file</button>
        </Fragment>
    );
}

export default Home;
