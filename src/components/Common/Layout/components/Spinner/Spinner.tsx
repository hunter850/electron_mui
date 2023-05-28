import { useMemo } from "react";
// redux
import { useAppSelector } from "@/app/hooks";
import { selectGlobalState } from "@/features/globalSlice";
// mui
import CircularProgress from "@mui/material/CircularProgress";
// styles
import { StyledBackdrop } from "./SpinnerStyles";

function Spinner(): JSX.Element {
    const { loading } = useAppSelector(selectGlobalState);
    const open = useMemo(() => {
        if (Array.isArray(loading) && loading.length > 0) {
            return true;
        } else {
            return false;
        }
    }, [loading]);
    return (
        <StyledBackdrop open={open}>
            <CircularProgress color="inherit" />
        </StyledBackdrop>
    );
}

export default Spinner;
