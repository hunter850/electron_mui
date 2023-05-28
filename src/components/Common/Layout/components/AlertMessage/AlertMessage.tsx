import { SnackbarProvider } from "notistack";
// components
import CustomAlert from "./components/CustomAlert";
// types
import type { ReactNode } from "react";

interface AlertMessageProps {
    children: ReactNode;
}

function AlertMessage(props: AlertMessageProps): JSX.Element {
    const { children } = props;
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            Components={{
                default: CustomAlert,
                success: CustomAlert,
                error: CustomAlert,
                warning: CustomAlert,
                info: CustomAlert,
            }}
        >
            {children}
        </SnackbarProvider>
    );
}

export default AlertMessage;
