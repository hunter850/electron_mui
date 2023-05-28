import { useState, useEffect } from "react";
// mui
import Typography from "@mui/material/Typography";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import CloseIcon from "@mui/icons-material/Close";
// styles
import { StyledAppBar, AppTitle, TitleImageWrap, TitleImage, ControlIconButton } from "./TitleStyles";
// utils
const { ipcRenderer, listenWindowSizeStatus } = window.electron;
// data
import reactIcon from "@/assets/react.svg";

function Title(): JSX.Element {
    const [isMaximize, setIsMaximize] = useState<boolean>(false);
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
    return (
        <StyledAppBar>
            <AppTitle>
                <TitleImageWrap>
                    <TitleImage src={reactIcon} alt="react icon" />
                </TitleImageWrap>
                <Typography variant="subtitle1" color="inherit" component="h1">
                    Electron MUI
                </Typography>
            </AppTitle>
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
        </StyledAppBar>
    );
}

export default Title;
