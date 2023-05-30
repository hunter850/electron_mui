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
            fileKey: "test",
            value: { greeting: "Hello World" },
        });
        if (result === "success") {
            console.log("write file success");
        } else {
            console.log("write file fail");
        }
    }
    async function readGreetingHandler() {
        const result = await ipcRenderer.invoke("read-file", "appData", { fileKey: "test" });
        if (result.status === "success") {
            console.log("reading data: ", result.data);
        } else {
            console.log("error: ", result.errorMessage);
        }
    }
    async function deleteGreetingHandler() {
        const result = await ipcRenderer.invoke("delete-file", "appData", { fileKey: "test" });
        if (result.status === "success") {
            console.log("file delete success");
        } else {
            console.log("file delete fail: ", result.errorMessage);
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
