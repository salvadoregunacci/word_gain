import {useAppDispatch, useAppSelector} from "../hooks.ts";
import Select from "./Select.tsx";
import {useTranslation} from "react-i18next";
import {changeAdvancedMode, changeLang, changeTheme} from "../redux/slices/settingsSlice.ts";
import {ChangeEvent} from "react";
import {Theme} from "../types.ts";
import Toggle from "./Toggle.tsx";
import {useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import {changeMenuVisability} from "../redux/slices/mainSlice.ts";

const MainMenu = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isActive = useAppSelector(state => state.main.isOpenMenu);
    const currenLang = useAppSelector(state => state.settings.currentLang);
    const currentTheme = useAppSelector(state => state.settings.currentTheme);
    const isAdvancedMode = useAppSelector(state => state.settings.isAdvancedMode);

    function handleChangeLang(e: ChangeEvent<HTMLSelectElement>) {
        dispatch(changeLang(e.target.value));
    }

    function handleChangeTheme(e: ChangeEvent<HTMLSelectElement>) {
        dispatch(changeTheme(e.target.value as Theme));
    }

    function handleChangeAdvancedMode(e: ChangeEvent<HTMLInputElement>) {
        dispatch(changeAdvancedMode(e.target.checked));
    }

    function handleClickToMenu() {
        dispatch(changeMenuVisability(false));
        navigate("/categories");
    }

    return (
        <div className={`main-menu ${isActive ? "_active" : ""}`}>
            <div className="container">
                <div className="setting-container">
                    <Select
                        label={t("Язык интерфейса:")}
                        value={currenLang}
                        onChange={handleChangeLang}
                        options={{
                            "Русский": "ru",
                            "Українська": "ua",
                        }}
                    />
                    <Select
                        label={t("Тема")}
                        value={currentTheme}
                        onChange={handleChangeTheme}
                        options={{
                            [t("Тёмная")]: "dark",
                        }}
                    />
                    <div className="advanced-mode">
                        <Toggle
                            checked={isAdvancedMode}
                            onChange={handleChangeAdvancedMode}
                        />
                        <div className="advanced-mode__wrap">
                            <div className="advanced-mode__title">{t("Режим")} <span>”{t("Продвинутый")}”</span></div>
                            <div className="advanced-mode__desc">{t("Отключает подсказки")}</div>
                        </div>
                    </div>
                </div>
                <div className="main-menu__actions">
                    <Button onClick={handleClickToMenu}>{t("В меню")}</Button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;