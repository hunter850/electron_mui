import { Outlet } from "react-router-dom";
// mui
import { CssBaseline } from "@mui/material";
// components
import Title from "./components/Title";
import AlertMessage from "./components/AlertMessage";
import Spinner from "./components/Spinner";
// styles
import { GlobalStyles, ContentWrap } from "./LayoutStyles";

function Layout(): JSX.Element {
    return (
        <AlertMessage>
            <CssBaseline />
            <GlobalStyles />
            <Title />
            <ContentWrap>
                <Outlet />
            </ContentWrap>
            <Spinner />
        </AlertMessage>
    );
}

export default Layout;
