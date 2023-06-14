import { createSlice } from "@reduxjs/toolkit";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

interface GlobalState {
    loading: string[];
    isMac: boolean;
}

const initialState: GlobalState = {
    loading: [],
    isMac: false,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        addLoadingId: (state, action: PayloadAction<string>) => {
            state.loading.push(action.payload);
        },
        removeLoadingId: (state, action: PayloadAction<string>) => {
            state.loading = state.loading.filter((id) => id !== action.payload);
        },
        mergeGlobalState: (state, action: PayloadAction<Partial<GlobalState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { addLoadingId, removeLoadingId, mergeGlobalState } = globalSlice.actions;

export const selectGlobalState = (state: RootState) => state.global;

export default globalSlice.reducer;
