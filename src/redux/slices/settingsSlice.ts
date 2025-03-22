import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import i18next from "i18next";
import {Theme} from "../../types.ts";

export const changeLang = createAsyncThunk<
    string,
    string
>(
    "settings/changeLang",
    async (lang: string) => {
        await i18next.changeLanguage(lang);
        window.localStorage.setItem("lang", lang);
        return lang;
    }
);

interface IState {
    currentLang: string,
    currentTheme: Theme,
    isAdvancedMode: boolean,
}

const initialState: IState = {
    currentLang: "ru",
    currentTheme: Theme.dark,
    isAdvancedMode: false,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<Theme>) {
            state.currentTheme = action.payload;
        },
        changeAdvancedMode(state, action: PayloadAction<boolean>) {
            state.isAdvancedMode = action.payload;

            if (action.payload) {
                window.localStorage.setItem("advancedMode", "1");
            } else {
                window.localStorage.removeItem("advancedMode");
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeLang.fulfilled, (state, action) => {
            state.currentLang = action.payload;
        })
    }
})

export const {
    changeTheme,
    changeAdvancedMode,
} = settingsSlice.actions;

export default settingsSlice.reducer;