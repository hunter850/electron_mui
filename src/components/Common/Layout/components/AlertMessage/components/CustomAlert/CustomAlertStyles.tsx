import styled from "@emotion/styled";
import { SnackbarContent } from "notistack";
import Alert from "@mui/material/Alert";

interface StyledSnackbarContentProps {
    horizontal?: "center" | "right" | "left";
}

// eslint-disable-next-line prettier/prettier
export const StyledSnackbarContent = styled(SnackbarContent, { shouldForwardProp: (propName) => propName !== "horizontal" })<StyledSnackbarContentProps>`
    justify-content: ${({ horizontal = "left" }) => {
        switch (horizontal) {
            case "center":
                return "center";
            case "right":
                return "flex-end";
            case "left":
                return "flex-start";
            default:
                return "center";
        }
    }};
    max-width: 600px;
`;

export const StyledAlert = styled(Alert)`
    & .MuiAlert-message {
        padding: 0px;
        & p {
            line-height: 36px;
        }
    }
`;
