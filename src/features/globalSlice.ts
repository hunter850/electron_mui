import { createSlice } from "@reduxjs/toolkit";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

interface GlobalState {
    loading: string[];
}

const initialState: GlobalState = {
    loading: [],
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        addLoadingId: (state, action: PayloadAction<string>) => {
            state.loading.push(action.payload);
        },
        removeLoadingId: (state, action) => {
            state.loading = state.loading.filter((id) => id !== action.payload);
        },
    },
});

export const { addLoadingId, removeLoadingId } = globalSlice.actions;

export const selectGlobalState = (state: RootState) => state.global;

export default globalSlice.reducer;
