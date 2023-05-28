import { forwardRef } from "react";
// mui
import Typography from "@mui/material/Typography";
// components
import { CustomContentProps, closeSnackbar } from "notistack";
// styles
import { StyledSnackbarContent, StyledAlert } from "./CustomAlertStyles";

const CustomAlert = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
    const { id, message, variant, anchorOrigin } = props;
    function closeHandler() {
        closeSnackbar(id);
    }
    return (
        <StyledSnackbarContent ref={ref} horizontal={anchorOrigin.horizontal}>
            <StyledAlert onClose={closeHandler} severity={variant === "default" ? "success" : variant}>
                <Typography>{message}</Typography>
            </StyledAlert>
        </StyledSnackbarContent>
    );
});

CustomAlert.displayName = "CustomAlert";

export default CustomAlert;
