import { configureStore } from "@reduxjs/toolkit";
import countReducer from "@/features/countSlice";
import globalReducer from "@/features/globalSlice";
import type { Middleware } from "@reduxjs/toolkit";

const isDev = process.env.NODE_ENV === "development";

const middlewares: Middleware[] = [];

if (isDev) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createLogger } = require("redux-logger");
    middlewares.push(createLogger());
}

export const store = configureStore({
    reducer: {
        global: globalReducer,
        count: countReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
