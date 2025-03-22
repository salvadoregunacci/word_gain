import Page from "./Page.tsx";
import Header from "../components/Header.tsx";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import Category from "../components/Category.tsx";
import NewCategoryBtn from "../components/NewCategoryBtn.tsx";
import {AlertVariant, ICategory} from "../types.ts";
import {useEffect, useRef, useState} from "react";
import Modal from "../components/Modal.tsx";
import Input from "../components/Input.tsx";
import MiniButton from "../components/MiniButton.tsx";
import {createCategory, deleteCategory, renameCategory, showAlert} from "../redux/slices/mainSlice.ts";
import Options from "../components/Options.tsx";

const CategoriesPage = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const categories: ICategory[] | null = useAppSelector(state => state.main.categories);
    const [isShowCreateModal, setIsShowCreateModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const inputNameCategoryRef = useRef<HTMLInputElement | null>(null);
    const [editableCategoryName, setEditableCategoryName] = useState<string | null>(null);

    const firstCategoryRef = useRef<HTMLDivElement | null>(null);
    const tutorialRef = useRef<HTMLDivElement | null>(null);
    const [tutorialStyle, setTutorialStyle] = useState<{ top: number; left: number } | null>(null);
    const [isShowTutorial, setIsShowTutorial] = useState(false);

    const [isShowRenameModal, setIsShowRenameModal] = useState(false);
    const [newNameCategory, setNewNameCategory] = useState("");
    const inputNewNameCategoryRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const isCompleteTutorial = window.localStorage.getItem("tutorialComplete1");

        if (!isCompleteTutorial && categories?.length) {
            document.body.style.pointerEvents = "none";

            setTimeout(() => {
                document.body.style.pointerEvents = "";
                setIsShowTutorial(true);
            }, 2000);

            if (!firstCategoryRef.current) return;

            setTimeout(() => {
                const categoryRect = firstCategoryRef.current?.getBoundingClientRect();
                if (categoryRect) {
                    setTutorialStyle({
                        top: categoryRect.top + window.scrollY - 50,
                        left: categoryRect.left + categoryRect.width / 2
                    });
                }
            }, 100);
        }
    }, [categories]);

    function handleClickNewCategory() {
        setIsShowCreateModal(true);

        if (inputNameCategoryRef?.current) {
            inputNameCategoryRef.current.focus();
        }
    }

    function handleCreateNewCategory() {
        if (categoryName.length <= 0) return;

        dispatch(createCategory({
            name: categoryName,
            lists: []
        }));

        dispatch(showAlert({text: t("Добавлено!"), variant: AlertVariant.success, lifetime: 3500}));
        setIsShowCreateModal(false);
        setCategoryName("");
    }

    function handleDeleteCategory() {
        if (editableCategoryName) {
            dispatch(deleteCategory(editableCategoryName));
            dispatch(showAlert({text: t("Удалено"), variant: AlertVariant.danger, lifetime: 3500}));
            setEditableCategoryName(null);
        }
    }

    function handleCompleteTutorial() {
        window.localStorage.setItem("tutorialComplete1", "1");
        setIsShowTutorial(false);
    }

    function handleRenameCategory() {
        if (editableCategoryName) {
            dispatch(renameCategory({
                oldName: editableCategoryName,
                newName: newNameCategory,
            }));

            dispatch(showAlert({text: t("Изменено"), variant: AlertVariant.warning, lifetime: 3500}));
            setEditableCategoryName(null);
            setIsShowRenameModal(false);
        }
    }

    function handleShowRenameModal() {
        setIsShowRenameModal(true);

        if (editableCategoryName) {
            setNewNameCategory(editableCategoryName);
        }

        if (inputNewNameCategoryRef?.current) {
            inputNewNameCategoryRef.current.focus();
        }
    }


    return (
        <Page title="Categories" className="categories-page">
            <Header/>
            <div className="page-content">
                <Modal
                    isActive={isShowCreateModal}
                    onClose={() => setIsShowCreateModal(false)}
                >
                    <div className="modal__title">{t("Название")}:</div>
                    <Input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        ref={inputNameCategoryRef}
                        className="new-category-input"
                        placeholder={t("Введите название...")}
                    />
                    <div className="new-category__actions">
                        <MiniButton className="red" onClick={() => setIsShowCreateModal(false)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M8 10.122L13.303 15.425C13.5844 15.7064 13.966 15.8645 14.364 15.8645C14.762 15.8645 15.1436 15.7064 15.425 15.425C15.7064 15.1436 15.8645 14.7619 15.8645 14.364C15.8645 13.966 15.7064 13.5844 15.425 13.303L10.12 7.99999L15.424 2.69699C15.5633 2.55766 15.6737 2.39226 15.7491 2.21024C15.8244 2.02821 15.8632 1.83313 15.8631 1.63613C15.8631 1.43914 15.8242 1.24407 15.7488 1.06209C15.6734 0.880101 15.5628 0.714755 15.4235 0.575488C15.2842 0.436221 15.1188 0.325762 14.9367 0.250416C14.7547 0.175071 14.5596 0.136315 14.3626 0.136361C14.1656 0.136408 13.9706 0.175255 13.7886 0.250687C13.6066 0.326118 13.4413 0.436656 13.302 0.575988L8 5.87899L2.697 0.575988C2.5587 0.432659 2.39323 0.318309 2.21027 0.239611C2.0273 0.160912 1.83049 0.119441 1.63132 0.117617C1.43215 0.115793 1.23462 0.153652 1.05024 0.228987C0.865859 0.304321 0.698329 0.415622 0.557424 0.556394C0.416519 0.697166 0.305061 0.864591 0.229553 1.0489C0.154045 1.23321 0.115999 1.43071 0.117635 1.62988C0.119271 1.82905 0.160556 2.02589 0.239082 2.20894C0.317608 2.39198 0.431802 2.55755 0.575001 2.69599L5.88 7.99999L0.576001 13.304C0.432803 13.4424 0.318609 13.608 0.240083 13.791C0.161557 13.9741 0.120271 14.1709 0.118635 14.3701C0.116999 14.5693 0.155045 14.7668 0.230553 14.9511C0.306061 15.1354 0.417519 15.3028 0.558424 15.4436C0.699329 15.5844 0.866858 15.6957 1.05124 15.771C1.23562 15.8463 1.43315 15.8842 1.63232 15.8824C1.83149 15.8805 2.0283 15.8391 2.21127 15.7604C2.39423 15.6817 2.5597 15.5673 2.698 15.424L8 10.122Z"
                                      fill="#B9443C"/>
                            </svg>
                        </MiniButton>
                        <MiniButton className="green" onClick={handleCreateNewCategory}>
                            <svg width="20" height="15" viewBox="0 0 20 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M19.1642 1.38657C19.4341 1.65661 19.5858 2.02281 19.5858 2.40465C19.5858 2.78649 19.4341 3.15269 19.1642 3.42273L8.3709 14.216C8.22826 14.3587 8.05892 14.4719 7.87254 14.5491C7.68616 14.6263 7.4864 14.666 7.28466 14.666C7.08292 14.666 6.88315 14.6263 6.69677 14.5491C6.51039 14.4719 6.34105 14.3587 6.19842 14.216L0.835855 8.85441C0.698321 8.72157 0.588618 8.56268 0.513149 8.38699C0.43768 8.21131 0.397956 8.02235 0.396295 7.83115C0.394633 7.63995 0.431068 7.45033 0.503472 7.27336C0.575877 7.09639 0.682801 6.93561 0.818007 6.8004C0.953212 6.6652 1.11399 6.55827 1.29096 6.48587C1.46793 6.41346 1.65755 6.37703 1.84875 6.37869C2.03996 6.38035 2.22891 6.42008 2.4046 6.49554C2.58028 6.57101 2.73918 6.68072 2.87202 6.81825L7.28418 11.2304L17.1271 1.38657C17.2608 1.25276 17.4196 1.1466 17.5943 1.07418C17.7691 1.00175 17.9564 0.964478 18.1456 0.964478C18.3348 0.964478 18.5221 1.00175 18.6969 1.07418C18.8717 1.1466 19.0304 1.25276 19.1642 1.38657Z"
                                      fill="#76AC3D"/>
                            </svg>
                        </MiniButton>
                    </div>
                </Modal>

                <Modal
                    isActive={isShowRenameModal}
                    onClose={() => {
                        setIsShowRenameModal(false);
                        setEditableCategoryName(null);
                    }}
                >
                    <div className="modal__title">{t("Название")}:</div>
                    <Input
                        value={newNameCategory}
                        onChange={(e) => setNewNameCategory(e.target.value)}
                        ref={inputNewNameCategoryRef}
                        className="new-category-input"
                        placeholder={t("Введите название...")}
                    />
                    <div className="new-category__actions">
                        <MiniButton className="red" onClick={() => {
                            setIsShowRenameModal(false);
                            setEditableCategoryName(null);
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M8 10.122L13.303 15.425C13.5844 15.7064 13.966 15.8645 14.364 15.8645C14.762 15.8645 15.1436 15.7064 15.425 15.425C15.7064 15.1436 15.8645 14.7619 15.8645 14.364C15.8645 13.966 15.7064 13.5844 15.425 13.303L10.12 7.99999L15.424 2.69699C15.5633 2.55766 15.6737 2.39226 15.7491 2.21024C15.8244 2.02821 15.8632 1.83313 15.8631 1.63613C15.8631 1.43914 15.8242 1.24407 15.7488 1.06209C15.6734 0.880101 15.5628 0.714755 15.4235 0.575488C15.2842 0.436221 15.1188 0.325762 14.9367 0.250416C14.7547 0.175071 14.5596 0.136315 14.3626 0.136361C14.1656 0.136408 13.9706 0.175255 13.7886 0.250687C13.6066 0.326118 13.4413 0.436656 13.302 0.575988L8 5.87899L2.697 0.575988C2.5587 0.432659 2.39323 0.318309 2.21027 0.239611C2.0273 0.160912 1.83049 0.119441 1.63132 0.117617C1.43215 0.115793 1.23462 0.153652 1.05024 0.228987C0.865859 0.304321 0.698329 0.415622 0.557424 0.556394C0.416519 0.697166 0.305061 0.864591 0.229553 1.0489C0.154045 1.23321 0.115999 1.43071 0.117635 1.62988C0.119271 1.82905 0.160556 2.02589 0.239082 2.20894C0.317608 2.39198 0.431802 2.55755 0.575001 2.69599L5.88 7.99999L0.576001 13.304C0.432803 13.4424 0.318609 13.608 0.240083 13.791C0.161557 13.9741 0.120271 14.1709 0.118635 14.3701C0.116999 14.5693 0.155045 14.7668 0.230553 14.9511C0.306061 15.1354 0.417519 15.3028 0.558424 15.4436C0.699329 15.5844 0.866858 15.6957 1.05124 15.771C1.23562 15.8463 1.43315 15.8842 1.63232 15.8824C1.83149 15.8805 2.0283 15.8391 2.21127 15.7604C2.39423 15.6817 2.5597 15.5673 2.698 15.424L8 10.122Z"
                                      fill="#B9443C"/>
                            </svg>
                        </MiniButton>
                        <MiniButton className="green" onClick={handleRenameCategory}>
                            <svg width="20" height="15" viewBox="0 0 20 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M19.1642 1.38657C19.4341 1.65661 19.5858 2.02281 19.5858 2.40465C19.5858 2.78649 19.4341 3.15269 19.1642 3.42273L8.3709 14.216C8.22826 14.3587 8.05892 14.4719 7.87254 14.5491C7.68616 14.6263 7.4864 14.666 7.28466 14.666C7.08292 14.666 6.88315 14.6263 6.69677 14.5491C6.51039 14.4719 6.34105 14.3587 6.19842 14.216L0.835855 8.85441C0.698321 8.72157 0.588618 8.56268 0.513149 8.38699C0.43768 8.21131 0.397956 8.02235 0.396295 7.83115C0.394633 7.63995 0.431068 7.45033 0.503472 7.27336C0.575877 7.09639 0.682801 6.93561 0.818007 6.8004C0.953212 6.6652 1.11399 6.55827 1.29096 6.48587C1.46793 6.41346 1.65755 6.37703 1.84875 6.37869C2.03996 6.38035 2.22891 6.42008 2.4046 6.49554C2.58028 6.57101 2.73918 6.68072 2.87202 6.81825L7.28418 11.2304L17.1271 1.38657C17.2608 1.25276 17.4196 1.1466 17.5943 1.07418C17.7691 1.00175 17.9564 0.964478 18.1456 0.964478C18.3348 0.964478 18.5221 1.00175 18.6969 1.07418C18.8717 1.1466 19.0304 1.25276 19.1642 1.38657Z"
                                      fill="#76AC3D"/>
                            </svg>
                        </MiniButton>
                    </div>
                </Modal>

                <div className="container">
                    <div className="navigation">
                        <div className="navigation__row">
                            <div className="navigation__title">{t("Выберите категорию:")}</div>
                        </div>
                    </div>

                    <div className="items-list">
                        {
                            categories ?
                                categories.map((category, index) => (
                                    <Category
                                        key={category.name}
                                        name={category.name}
                                        lists={category.lists}
                                        onLongPress={() => setEditableCategoryName(category.name)}
                                        ref={index === 0 ? firstCategoryRef : undefined}
                                    />
                                ))
                                : null
                        }
                        <NewCategoryBtn
                            onClick={handleClickNewCategory}
                        />
                    </div>
                </div>

                <Options
                    style={{opacity: isShowRenameModal ? 0 : ""}}
                    isActive={editableCategoryName !== null}
                    onClose={() => setEditableCategoryName(null)}
                    onDelete={handleDeleteCategory}
                    onEdit={handleShowRenameModal}
                />

                {
                    isShowTutorial ?
                        <div className="tutorial tutorial_1" onClick={handleCompleteTutorial}>
                            <div
                                ref={tutorialRef}
                                className="tutorial__content"
                                style={tutorialStyle ? {
                                    top: tutorialStyle.top,
                                    left: tutorialStyle.left,
                                    position: "absolute"
                                } : {}}
                            >
                                <div className="tutorial__icon">
                                    <svg width="48" height="62" viewBox="0 0 48 62" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M47.5815 30.1441C44.4329 26.8184 40.2347 24.543 35.8617 23.6679C33.9375 23.1428 32.0133 22.7927 30.0892 22.6177C34.987 16.8416 34.1124 8.08995 28.3399 3.18903C22.5675 -1.71188 13.8213 -0.836718 8.92344 4.93936C4.02558 10.7154 4.9002 19.4671 10.6727 24.368C11.7222 25.2431 12.7718 25.9433 13.8213 26.2933V30.1441L11.0225 27.5186C8.57359 25.0681 4.55035 25.0681 1.9265 27.5186C-0.522429 29.969 -0.697353 33.8197 1.75158 36.2702L9.79806 45.722C10.1479 48.1724 11.0225 50.4478 12.247 52.5482C13.1216 54.1235 14.3461 55.6988 15.5705 56.9241V60.2497C15.5705 61.2999 16.2702 62 17.3198 62H41.1094C41.984 62 42.8586 61.1248 42.8586 60.2497V55.6988C46.1821 51.6731 47.9314 46.5971 47.9314 41.5212V31.3693C48.1063 30.6692 47.9314 30.3191 47.5815 30.1441ZM9.09836 13.691C9.09836 7.91491 13.8213 3.36407 19.5938 3.5391C25.3662 3.5391 29.9143 8.26498 29.7393 14.0411C29.7393 17.1916 28.3399 19.9922 25.891 21.9175V13.1659C25.8017 11.649 25.1359 10.2238 24.0301 9.18235C22.9242 8.14093 21.4622 7.56222 19.9436 7.56485C16.795 7.38982 13.9962 10.0153 13.9962 13.1659V22.2676C11.0225 20.5173 9.27329 17.1916 9.09836 13.691ZM44.6078 41.3462C44.7828 45.897 43.2084 50.2728 40.2347 53.7735C39.8849 54.1235 39.535 54.4736 39.535 54.9987V58.6744H19.2439V56.2239C19.2439 55.6988 18.8941 55.1737 18.5442 54.8237C17.3198 53.7735 16.2702 52.5482 15.3956 50.9729C14.3461 49.2226 13.6464 47.1222 13.2965 45.0218C13.2965 44.6718 13.1216 44.3217 12.9467 43.9716L4.55035 33.9948C4.02558 33.4697 3.67573 32.7696 3.67573 31.8944C3.67573 31.1943 4.02558 30.3191 4.55035 29.794C5.77482 28.7438 7.52405 28.7438 8.74852 29.794L13.8213 34.8699V40.1209L17.1448 38.3706V13.1659C17.3198 11.9407 18.3693 10.8905 19.7687 11.0655C20.9932 11.0655 22.2176 11.9407 22.2176 13.1659V33.2946L25.7161 33.9948V25.9433C25.891 25.7682 26.0659 25.7682 26.2409 25.5932C27.4653 25.5932 28.6898 25.7682 29.9143 25.9433V34.8699L32.713 35.395V26.2933L34.8121 26.8184C35.6867 26.9935 36.5614 27.3435 37.436 27.6936V36.4452L40.2347 36.9703V28.9188C41.8091 29.619 43.2084 30.6692 44.4329 31.8944L44.6078 41.3462Z"
                                            fill="#A8C7FA"/>
                                    </svg>
                                </div>
                                <div className="tutorial__text">
                                    {t("Удерживайте палец на элементе, чтобы изменить его")}
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        </Page>
    );
};

export default CategoriesPage;