import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import {changeAdvancedMode, changeLang, changeTheme} from "./redux/slices/settingsSlice.ts";
import {Theme} from "./types.ts";
import "./assets/styles/main.scss";
import "./langs/lang.ts";
import MainMenu from "./components/MainMenu.tsx";
import {parseSavedData} from "./redux/slices/mainSlice.ts";

function App() {
    const dispatch = useAppDispatch();
    const isVisibleLoadingOverlay = useAppSelector(state => state.main.isShowOverlay);
    const alert = useAppSelector(state => state.main.alert);
    const advancedMode = useAppSelector(state => state.settings.isAdvancedMode);

    useEffect(() => {
        const savedData: string = window.localStorage.data;
        const savedLang: string | null = window.localStorage.getItem("lang");
        const savedTheme: string | null = window.localStorage.getItem("theme");
        const advancedMode: string | null = window.localStorage.getItem("advancedMode");

        if (savedLang) {
            dispatch(changeLang(savedLang));
        }

        if (savedTheme) {
            dispatch(changeTheme(savedTheme as Theme));
        }

        if (savedData) {
            dispatch(parseSavedData(savedData));
        }

        if (advancedMode) {
            dispatch(changeAdvancedMode(true));
        }
    }, []);

    return (
        <div
            className={`content ${isVisibleLoadingOverlay ? "_show-loading-overlay" : ""} ${advancedMode ? "_advanced-mode" : ""}`}>
            <Outlet/>
            <MainMenu/>

            <div className="loading-overlay">
                <span className="loader"></span>
            </div>

            <div className={`alert ${alert ? `_active ${alert.variant}` : ""}`}>
                <div className="alert__msg">
                    {alert?.text || ""}
                </div>
            </div>
        </div>
    )
}

export default App
