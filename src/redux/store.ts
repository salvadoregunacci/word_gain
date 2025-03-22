import {configureStore} from '@reduxjs/toolkit'
import MainSlice from "./slices/mainSlice.ts";
import SettingsSlice from "./slices/settingsSlice.ts";

export const store = configureStore({
    reducer: {
        main: MainSlice,
        settings: SettingsSlice,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
