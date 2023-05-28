import { Fragment } from "react";
// redux
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectCount, incrementByAmount } from "@/features/countSlice";
// utils
import { enqueueSnackbar } from "notistack";

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
    return (
        <Fragment>
            <h1>Home</h1>
            <h1>{count}</h1>
            <button onClick={clickHandler}>click</button>
            <button onClick={alertHandler}>alert</button>
        </Fragment>
    );
}

export default Home;
