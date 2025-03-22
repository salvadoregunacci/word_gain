import Page from "./Page.tsx";
import Header from "../components/Header.tsx";
import {ICategory, ViewType} from "../types.ts";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Select from "../components/Select.tsx";
import Button from "../components/Button.tsx";
import CreateWordInput from "../components/CreateWordInput.tsx";
import CreateFieldBtn from "../components/CreateFieldBtn.tsx";
import WordCardsList from "../components/WordCardsList.tsx";
import WordCard from "../components/WordCard.tsx";
import {createList, setChallenge, setVisibleOverlay} from "../redux/slices/mainSlice.ts";
import Input from "../components/Input.tsx";

const NewListPage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [activeScreen, setActiveScreen] = useState(1);
    const category: ICategory | null = useAppSelector(state => state.main.selectedCategory);
    const [lang1, setLang1] = useState("English");
    const [lang2, setLang2] = useState("Русский");
    const [fields1, setFields1] = useState<{ id: string; value: string }[]>([
        {id: crypto.randomUUID(), value: ""},
        {id: crypto.randomUUID(), value: ""},
        {id: crypto.randomUUID(), value: ""},
        {id: crypto.randomUUID(), value: ""},
        {id: crypto.randomUUID(), value: ""},
    ]);
    const [fields2, setFields2] = useState<string[]>([]);
    const [isScrollToBottomList1, setIsScrollToBottomList1] = useState(false);
    const [isAllowedNextScreen2, setIsAllowedNextScreen2] = useState(false);
    const [isAllowedNextScreen3, setIsAllowedNextScreen3] = useState(false);
    const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [listName, setListName] = useState("");
    const listNameInputRef = useRef<HTMLInputElement | null>(null);

    const [isShowTutorial, setIsShowTutorial] = useState(false);

    function handleCompleteTutorial() {
        window.localStorage.setItem("tutorialComplete2", "1");
        setIsShowTutorial(false);

        if (activeScreen === 3 && wordRefs && wordRefs.current && wordRefs.current[0]) {
            wordRefs.current[0].focus();
        }
    }

    function getWordsList() {
        const list: Record<string, string> = {};
        const keys = fields1.map(field => field.value);

        keys.forEach((key, index) => {
            list[key] = fields2[index];
        });

        return list;
    }

    function handleClickNextScreen() {
        if (activeScreen === 2) {
            setFields2(Array(fields1.length).fill(""));
        }

        if (activeScreen === 3) {
            if (!category) return;

            dispatch(createList({
                category: category?.name,
                lang_1: lang1,
                lang_2: lang2,
                name: listName,
                words: getWordsList(),
            }));
        }

        if (activeScreen === 2 || activeScreen === 3) {
            dispatch(setVisibleOverlay(true));

            setTimeout(() => {
                dispatch(setVisibleOverlay(false));
            }, 1000);

            setTimeout(() => {
                setActiveScreen(prev => prev + 1);
            }, 300);
        } else {
            setActiveScreen(prev => prev + 1);
        }
    }

    function handleAddField() {
        setFields1(prev => [...prev, {
            id: crypto.randomUUID(),
            value: ""
        }]);
        setIsScrollToBottomList1(true);

        setTimeout(() => {
            setIsScrollToBottomList1(false);
        }, 500);
    }

    function handleChangeValuesInFields1(id: string, value: string) {
        setFields1(prev =>
            prev.map((field) =>
                field.id === id ? {...field, value} : field
            )
        );
    }

    function handleChangeValuesInFields2(index: number, value: string) {
        setFields2(prev => {
            let _values = [...prev];

            _values = _values.map((val, idx) => {
                if (index === idx) {
                    val = value;
                }

                return val;
            });

            return _values;
        });
    }

    function handleDeleteField(id: string) {
        setFields1(prev => prev.filter(item => item.id !== id));
        wordRefs.current = wordRefs.current.filter((_, idx) => fields1[idx]?.id !== id);
    }

    function handleClickOpenList() {
        dispatch(setChallenge({
            step: 1,
            list: {
                name: listName,
                lang_1: lang1,
                lang_2: lang2,
                words: getWordsList(),
            }
        }));
        navigate("/challange");
    }

    function handleClickToLists() {
        if (!category) return;

        navigate("/lists");
    }

    useEffect(() => {
        if (!category) {
            navigate("/categories");
        }

        if (listNameInputRef && listNameInputRef.current) {
            listNameInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        let isExistEmptyField = false;

        fields1.forEach(field => {
            if (field.value.length <= 0) {
                isExistEmptyField = true;
            }
        });

        setIsAllowedNextScreen2(!isExistEmptyField);
    }, [fields1]);

    useEffect(() => {
        let isExistEmptyField = false;

        fields2.forEach(val => {
            if (val.length <= 0) {
                isExistEmptyField = true;
            }
        });

        setIsAllowedNextScreen3(!isExistEmptyField);
    }, [fields2]);

    useEffect(() => {
        const isCompleteTutorial = window.localStorage.getItem("tutorialComplete2");

        if (isCompleteTutorial && activeScreen === 3 && wordRefs && wordRefs.current && wordRefs.current[0]) {
            wordRefs.current[0].focus();
        }

        if (!isCompleteTutorial && activeScreen === 2) {
            setIsShowTutorial(true);
        }
    }, [activeScreen]);

    return (
        <Page title="New list" className="new-list-page">
            <Header/>
            <div className="page-content">
                <div className="container content-container">
                    {
                        activeScreen !== 4 ?
                            <div className="navigation">
                                <div className="navigation__row breadcrumps">
                                    <div className="breadcrumps__title">{t("Категория")}:</div>
                                    <div className="breadcrumps__value">{category ? category.name : ""}</div>
                                </div>
                                <div className="navigation__row">
                                    <div className="navigation__title">
                                        <Link to="/lists" className="navigation__back">
                                            <svg width="14" height="27" viewBox="0 0 14 27" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 1.5L1 13.5L13 25.5" stroke="#5B5D61" strokeWidth="2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </Link>
                                        <span>{t("Создание листа:")}</span>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    {
                        activeScreen === 1 ?
                            <div className={`screen screen_1 _active`}>
                                <Input
                                    ref={listNameInputRef}
                                    value={listName}
                                    onChange={e => setListName(e.target.value)}
                                    className="list-name-input"
                                    fieldLabel={t("Название листа:")}
                                    placeholder={t("Название")}
                                />
                                <div className="lang-selects fadeInDown">
                                    <Select
                                        onChange={(e) => setLang1(e.target.value)}
                                        value={lang1}
                                        label={t("Изучаемый язык:")}
                                        options={[
                                            "English",
                                            "Українська",
                                            "Русский",
                                        ]}
                                    />
                                    <Select
                                        onChange={(e) => setLang2(e.target.value)}
                                        value={lang2}
                                        label={t("Родной язык:")}
                                        options={[
                                            "English",
                                            "Українська",
                                            "Русский",
                                        ]}
                                    />
                                </div>
                            </div>
                            : null
                    }
                    {
                        activeScreen === 2 ?
                            <div className={`screen screen_2 _active`}>
                                <div className="info">
                                    <div className="info__row">
                                        <span>{t("Создайте список слов")}</span>
                                    </div>
                                    <div className="info__row">
                                        <span>{t("Язык")}:</span>
                                        <div className="info__label">
                                            {lang1}
                                        </div>
                                    </div>
                                </div>

                                <div className="create-fields">
                                    <WordCardsList
                                        className="create-fields__list"
                                        isScrollToBottom={isScrollToBottomList1}
                                    >
                                        {
                                            fields1.map((field, index) => (
                                                <CreateWordInput
                                                    value={field.value}
                                                    placeholder={t("Введите слово...")}
                                                    key={field.id}
                                                    index={index + 1}
                                                    isFocus={((isScrollToBottomList1 && index === (fields1.length - 1)) || index === 0) && !!(window.localStorage.getItem("tutorialComplete2"))}
                                                    onChange={(e) => handleChangeValuesInFields1(field.id, e.target.value)}
                                                    onSwipe={() => handleDeleteField(field.id)}
                                                />
                                            ))
                                        }
                                    </WordCardsList>
                                    <CreateFieldBtn onClick={handleAddField}/>
                                </div>
                            </div>
                            : null
                    }
                    {
                        activeScreen === 3 ?
                            <div className={`screen screen_3 _active`}>
                                <div className="info">
                                    <div className="info__row">
                                        <span>{t("Добавьте переводы для слов")}</span>
                                    </div>
                                    <div className="info__row">
                                        <span>{t("Язык")}:</span>
                                        <div className="info__label">
                                            {lang2}
                                        </div>
                                    </div>
                                </div>

                                <WordCardsList>
                                    {
                                        fields2.map((val, index) => (
                                            <WordCard
                                                key={fields1[index]?.id || index}
                                                index={index}
                                                word={fields1[index]?.value || ""}
                                                value={val}
                                                isCreatedMode={true}
                                                onChange={(e) => handleChangeValuesInFields2(index, e.target.value)}
                                                ref={el => wordRefs.current[index] = el}
                                            />
                                        ))
                                    }
                                </WordCardsList>
                            </div>
                            : null
                    }

                    {
                        activeScreen === 4 ?
                            <div className={`screen screen_4 _active`}>
                                <div className="list-created">
                                    <div className="list-created__wrap">
                                        <svg className="checkmark" width="65" height="64" viewBox="0 0 65 64"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M32.5 64C24.0131 64 15.8737 60.6286 9.87258 54.6274C3.87142 48.6263 0.5 40.4869 0.5 32C0.5 23.5131 3.87142 15.3737 9.87258 9.37258C15.8737 3.37142 24.0131 0 32.5 0C40.9869 0 49.1263 3.37142 55.1274 9.37258C61.1286 15.3737 64.5 23.5131 64.5 32C64.5 40.4869 61.1286 48.6263 55.1274 54.6274C49.1263 60.6286 40.9869 64 32.5 64ZM26.1 48L54.9 20.8L50.1 16L26.1 38.4L14.9 27.2L10.1 32L26.1 48Z"
                                                fill="#A8C7FA"/>
                                        </svg>
                                        <div className="list-created__title">
                                            {t("Лист создан!")}
                                        </div>

                                        <svg className="abstract abstract_1" width="47" height="47" viewBox="0 0 47 47"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M26.2412 2.32121C25.1964 -0.547216 21.1418 -0.547216 20.097 2.32121L15.3557 15.3556L2.32124 20.0969C-0.547185 21.1418 -0.547185 25.1964 2.32124 26.2412L15.3557 30.9825L20.097 44.0169C21.1418 46.8854 25.1964 46.8854 26.2412 44.0169L30.9825 30.9825L44.017 26.2412C46.8854 25.1964 46.8854 21.1418 44.017 20.0969L30.9825 15.3556L26.2412 2.32121Z"
                                                  fill="#1A1A1C"/>
                                        </svg>
                                        <svg className="abstract abstract_2" width="47" height="47" viewBox="0 0 47 47"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M26.2412 2.32121C25.1964 -0.547216 21.1418 -0.547216 20.097 2.32121L15.3557 15.3556L2.32124 20.0969C-0.547185 21.1418 -0.547185 25.1964 2.32124 26.2412L15.3557 30.9825L20.097 44.0169C21.1418 46.8854 25.1964 46.8854 26.2412 44.0169L30.9825 30.9825L44.017 26.2412C46.8854 25.1964 46.8854 21.1418 44.017 20.0969L30.9825 15.3556L26.2412 2.32121Z"
                                                  fill="#1A1A1C"/>
                                        </svg>
                                        <svg className="abstract abstract_3" width="47" height="47" viewBox="0 0 47 47"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M26.2412 2.32121C25.1964 -0.547216 21.1418 -0.547216 20.097 2.32121L15.3557 15.3556L2.32124 20.0969C-0.547185 21.1418 -0.547185 25.1964 2.32124 26.2412L15.3557 30.9825L20.097 44.0169C21.1418 46.8854 25.1964 46.8854 26.2412 44.0169L30.9825 30.9825L44.017 26.2412C46.8854 25.1964 46.8854 21.1418 44.017 20.0969L30.9825 15.3556L26.2412 2.32121Z"
                                                  fill="#1A1A1C"/>
                                        </svg>
                                        <svg className="abstract abstract_4" width="47" height="47" viewBox="0 0 47 47"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M26.2412 2.32121C25.1964 -0.547216 21.1418 -0.547216 20.097 2.32121L15.3557 15.3556L2.32124 20.0969C-0.547185 21.1418 -0.547185 25.1964 2.32124 26.2412L15.3557 30.9825L20.097 44.0169C21.1418 46.8854 25.1964 46.8854 26.2412 44.0169L30.9825 30.9825L44.017 26.2412C46.8854 25.1964 46.8854 21.1418 44.017 20.0969L30.9825 15.3556L26.2412 2.32121Z"
                                                  fill="#1A1A1C"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    <div className={`actions ${activeScreen === 4 ? "_is-last" : ""}`}>
                        {
                            activeScreen === 1 ?
                                <Button
                                    disabled={!(listName.length > 0)}
                                    onClick={handleClickNextScreen}
                                >
                                    {t("Далее")}
                                </Button>
                                : null
                        }
                        {
                            activeScreen === 2 ?
                                <Button
                                    disabled={!isAllowedNextScreen2}
                                    onClick={handleClickNextScreen}
                                >
                                    {t("Далее")}
                                </Button>
                                : null
                        }
                        {
                            activeScreen === 3 ?
                                <Button
                                    disabled={!isAllowedNextScreen3}
                                    onClick={handleClickNextScreen}
                                >
                                    {t("Далее")}
                                </Button>
                                : null
                        }
                        {
                            activeScreen === 4 ?
                                <>
                                    <Button
                                        onClick={handleClickOpenList}
                                    >
                                        {t("Открыть")}
                                    </Button>

                                    <Button
                                        viewType={ViewType.border}
                                        onClick={handleClickToLists}
                                    >
                                        {t("К листам")}
                                    </Button>
                                </>
                                : null
                        }
                    </div>
                </div>

                {
                    isShowTutorial ?
                        <div className="tutorial tutorial_2" onClick={handleCompleteTutorial}>
                            <div className="tutorial__content">
                                <div className="tutorial__icon">
                                    <svg width="58" height="63" viewBox="0 0 58 63" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M56 9.38458H38.0006M56 9.38458C56 7.3202 50.0182 3.46276 48.5003 2.0118M56 9.38458C56 11.449 50.0182 15.3064 48.5003 16.7574M12.5375 35.9709V6.39418C12.5375 5.22877 13.0084 4.11109 13.8467 3.28703C14.685 2.46296 15.8219 2 17.0074 2C18.1928 2 19.3298 2.46296 20.168 3.28703C21.0063 4.11109 21.4772 5.22877 21.4772 6.39418V21.7355M21.4772 21.7355V28.5892M21.4772 21.7355C23.8891 18.4384 29.2979 19.5354 30.4469 24.6639C30.4669 24.7485 30.4829 24.834 30.4949 24.9205M30.4949 24.9205C30.524 25.1524 30.539 25.3858 30.5399 25.6195V28.5774M30.4949 24.9205C31.9738 20.9392 38.7686 22.458 39.5066 28.1439M39.5066 28.1439V31.5236M39.5066 28.1439C40.7185 23.7497 48.6743 26.8198 48.5033 31.9601V41.3324C48.4943 46.4225 47.6303 50.1148 44.5494 53.1495C41.7055 56.4879 42.3775 58.3576 42.3055 61M12.5375 22.6261C8.58065 26.1474 4.08981 30.9574 3.51683 32.0987C0.849925 36.0859 1.79789 39.2149 5.58976 44.5292C8.40966 48.481 12.1955 52.8929 12.3935 53.1111C14.4125 55.3583 14.0165 57.1455 14.0165 60.9646"
                                            stroke="#A8C7FA" strokeWidth="4" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="tutorial__text">
                                    {t("Смахните элемент вправо, чтобы удалить")}
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        </Page>
    );
};

export default NewListPage;