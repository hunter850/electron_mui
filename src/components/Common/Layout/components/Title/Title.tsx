import { useState, useEffect } from "react";
// redux
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectGlobalState, mergeGlobalState } from "@/features/globalSlice";
// mui
// import Typography from "@mui/material/Typography";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import CloseIcon from "@mui/icons-material/Close";
// styles
import { StyledAppBar, AppTitle, ControlIconButton } from "./TitleStyles";
// import { TitleImageWrap, TitleImage, } from "./TitleStyles";
// utils
const { ipcRenderer, listenWindowSizeStatus, isMac } = window.electron;
// data
// import reactIcon from "@/assets/react.svg";

function Title(): JSX.Element {
    const [isMaximize, setIsMaximize] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { isMac: platformIsMac } = useAppSelector(selectGlobalState);

    function minimizeWindowHandler() {
        ipcRenderer.invoke("resize-window", "minimize");
    }

    async function maximizeWindowHandler() {
        ipcRenderer.invoke("resize-window", "maximize");
    }

    async function unmaximizeWindowHandler() {
        ipcRenderer.invoke("resize-window", "unmaximize");
    }

    function closeWindowHandler() {
        ipcRenderer.invoke("close-window");
    }
    useEffect(() => {
        function setSize(message: string): void {
            if (message === "maximize") {
                setIsMaximize(true);
            } else if (message === "unmaximize") {
                setIsMaximize(false);
            }
        }
        const removeListenWindowSize = listenWindowSizeStatus(setSize);
        return () => {
            removeListenWindowSize();
        };
    }, []);

    useEffect(() => {
        (async () => {
            const isMacResult = await isMac();
            dispatch(mergeGlobalState({ isMac: isMacResult }));
        })();
    }, [dispatch]);
    return (
        <StyledAppBar>
            <AppTitle>
                {/* {!platformIsMac && (
                    <>
                        <TitleImageWrap>
                            <TitleImage src={reactIcon} alt="react icon" />
                        </TitleImageWrap>
                        <Typography variant="subtitle1" color="inherit" component="h1">
                            Electron MUI
                        </Typography>
                    </>
                )} */}
            </AppTitle>
            {!platformIsMac && (
                <>
                    <ControlIconButton
                        onClick={minimizeWindowHandler}
                        color="inherit"
                        aria-label="minimize"
                        disableRipple={true}
                    >
                        <MinimizeIcon />
                    </ControlIconButton>
                    {isMaximize ? (
                        <ControlIconButton
                            onClick={unmaximizeWindowHandler}
                            color="inherit"
                            aria-label="maximize"
                            disableRipple={true}
                        >
                            <FilterNoneIcon />
                        </ControlIconButton>
                    ) : (
                        <ControlIconButton
                            onClick={maximizeWindowHandler}
                            color="inherit"
                            aria-label="maximize"
                            disableRipple={true}
                        >
                            <CropSquareIcon />
                        </ControlIconButton>
                    )}
                    <ControlIconButton
                        onClick={closeWindowHandler}
                        isClose
                        color="inherit"
                        aria-label="close"
                        disableRipple={true}
                    >
                        <CloseIcon />
                    </ControlIconButton>
                </>
            )}
        </StyledAppBar>
    );
}

export default Title;
