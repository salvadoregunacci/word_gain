import Page from "./Page.tsx";
import Header from "../components/Header.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {useTranslation} from "react-i18next";
import List from "../components/List.tsx";
import {AlertVariant, ICategory} from "../types.ts";
import NewListBtn from "../components/NewListBtn.tsx";
import {Link, useNavigate} from "react-router-dom";
import {MouseEventHandler, useRef, useState} from "react";
import Options from "../components/Options.tsx";
import {deleteList, renameList, showAlert} from "../redux/slices/mainSlice.ts";
import Input from "../components/Input.tsx";
import MiniButton from "../components/MiniButton.tsx";
import Modal from "../components/Modal.tsx";

const ListsPage = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const category: ICategory | null = useAppSelector(state => state.main.selectedCategory);
    const navigate = useNavigate();
    const [editableListName, setEditableListName] = useState<string | null>(null);

    const [isShowRenameModal, setIsShowRenameModal] = useState(false);
    const [newNameList, setNewNameList] = useState("");
    const inputNewNameListRef = useRef<HTMLInputElement | null>(null);

    const handleClickNewList: MouseEventHandler<HTMLDivElement> = () => {
        navigate("/new_list");
    }

    function handleDeleteList() {
        if (editableListName && category) {
            dispatch(deleteList({category: category.name, listName: editableListName}));
            dispatch(showAlert({text: t("Удалено"), variant: AlertVariant.danger, lifetime: 3500}))
            setEditableListName(null);
        }
    }

    function handleRenameList() {
        if (editableListName && category) {
            dispatch(renameList({
                categoryName: category.name,
                oldName: editableListName,
                newName: newNameList,
            }));

            dispatch(showAlert({text: t("Изменено"), variant: AlertVariant.warning, lifetime: 3500}));
            setEditableListName(null);
            setIsShowRenameModal(false);
        }
    }

    function handleShowRenameModal() {
        setIsShowRenameModal(true);

        if (editableListName) {
            setNewNameList(editableListName);
        }

        if (inputNewNameListRef?.current) {
            inputNewNameListRef.current.focus();
        }
    }

    return (
        <Page title="Lists">
            <Header/>
            <div className="page-content">
                <Modal
                    isActive={isShowRenameModal}
                    onClose={() => {
                        setIsShowRenameModal(false);
                        setEditableListName(null);
                    }}
                >
                    <div className="modal__title">{t("Название")}:</div>
                    <Input
                        value={newNameList}
                        onChange={(e) => setNewNameList(e.target.value)}
                        ref={inputNewNameListRef}
                        className="new-category-input"
                        placeholder={t("Введите название...")}
                    />
                    <div className="new-category__actions">
                        <MiniButton className="red" onClick={() => {
                            setIsShowRenameModal(false);
                            setEditableListName(null);
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M8 10.122L13.303 15.425C13.5844 15.7064 13.966 15.8645 14.364 15.8645C14.762 15.8645 15.1436 15.7064 15.425 15.425C15.7064 15.1436 15.8645 14.7619 15.8645 14.364C15.8645 13.966 15.7064 13.5844 15.425 13.303L10.12 7.99999L15.424 2.69699C15.5633 2.55766 15.6737 2.39226 15.7491 2.21024C15.8244 2.02821 15.8632 1.83313 15.8631 1.63613C15.8631 1.43914 15.8242 1.24407 15.7488 1.06209C15.6734 0.880101 15.5628 0.714755 15.4235 0.575488C15.2842 0.436221 15.1188 0.325762 14.9367 0.250416C14.7547 0.175071 14.5596 0.136315 14.3626 0.136361C14.1656 0.136408 13.9706 0.175255 13.7886 0.250687C13.6066 0.326118 13.4413 0.436656 13.302 0.575988L8 5.87899L2.697 0.575988C2.5587 0.432659 2.39323 0.318309 2.21027 0.239611C2.0273 0.160912 1.83049 0.119441 1.63132 0.117617C1.43215 0.115793 1.23462 0.153652 1.05024 0.228987C0.865859 0.304321 0.698329 0.415622 0.557424 0.556394C0.416519 0.697166 0.305061 0.864591 0.229553 1.0489C0.154045 1.23321 0.115999 1.43071 0.117635 1.62988C0.119271 1.82905 0.160556 2.02589 0.239082 2.20894C0.317608 2.39198 0.431802 2.55755 0.575001 2.69599L5.88 7.99999L0.576001 13.304C0.432803 13.4424 0.318609 13.608 0.240083 13.791C0.161557 13.9741 0.120271 14.1709 0.118635 14.3701C0.116999 14.5693 0.155045 14.7668 0.230553 14.9511C0.306061 15.1354 0.417519 15.3028 0.558424 15.4436C0.699329 15.5844 0.866858 15.6957 1.05124 15.771C1.23562 15.8463 1.43315 15.8842 1.63232 15.8824C1.83149 15.8805 2.0283 15.8391 2.21127 15.7604C2.39423 15.6817 2.5597 15.5673 2.698 15.424L8 10.122Z"
                                      fill="#B9443C"/>
                            </svg>
                        </MiniButton>
                        <MiniButton className="green" onClick={handleRenameList}>
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
                        <div className="navigation__row breadcrumps">
                            <div className="breadcrumps__title">{t("Категория")}:</div>
                            <div className="breadcrumps__value">{category ? category.name : ""}</div>
                        </div>
                        <div className="navigation__row">
                            <div className="navigation__title">
                                <Link to="/categories" className="navigation__back">
                                    <svg width="14" height="27" viewBox="0 0 14 27" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1.5L1 13.5L13 25.5" stroke="#5B5D61" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                                <span>{t("Выберите лист:")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="items-list">
                        {
                            category && category.lists ?
                                category.lists.map(list => (
                                    <List
                                        key={list.name}
                                        list={list}
                                        onLongPress={() => setEditableListName(list.name)}
                                    />
                                ))
                                : null
                        }
                        <NewListBtn onClick={handleClickNewList}/>
                    </div>
                </div>

                <Options
                    style={{opacity: isShowRenameModal ? 0 : ""}}
                    isActive={editableListName !== null}
                    onClose={() => setEditableListName(null)}
                    onDelete={handleDeleteList}
                    onEdit={handleShowRenameModal}
                />
            </div>
        </Page>
    );
};

export default ListsPage;