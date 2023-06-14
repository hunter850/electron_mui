import styled from "@emotion/styled";
import Box, { BoxProps } from "@mui/material/Box";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const StyledAppBar = styled(AppBar)<AppBarProps>`
    &.MuiAppBar-root {
        display: flex;
        flex-direction: row;
        position: static;
        height: 30px;
        background-color: #fff;
    }
`;

export const AppTitle = styled(Box)<BoxProps>`
    -webkit-app-region: drag;
    flex: 1 0 0;
    display: flex;
    flex-direction: row;
`;

export const TitleImageWrap = styled(Box)<BoxProps>`
    font-size: 0px;
    padding: 4px;
`;

export const TitleImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
`;

type ControlIconButtonProps = IconButtonProps<"button", { isClose?: boolean }>;

// eslint-disable-next-line prettier/prettier
export const ControlIconButton = styled(IconButton, { shouldForwardProp: (propName) => propName !== "isClose" })<ControlIconButtonProps>`
    border-radius: 0px;
    width: 40px;
    height: 30px;
    padding: 8px 0px;
    &.MuiButtonBase-root:hover {
        background-color: ${({ isClose = false }) => (isClose ? "#f00c" : "#0003")};
        & svg {
            color: #fff;
        }
    }
    & svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        color: gray;
    }
`;
