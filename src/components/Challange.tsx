import {MouseEventHandler, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import WordCard from "./WordCard.tsx";
import WordCardsList from "./WordCardsList.tsx";
import Pagination from "./Pagination.tsx";
import Button from "./Button.tsx";
import {setChallenge, setVisibleOverlay} from "../redux/slices/mainSlice.ts";
import Modal from "./Modal.tsx";
import FlatButton from "./FlatButton.tsx";

const Challange = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const category = useAppSelector(state => state.main.selectedCategory);
    const challange = useAppSelector(state => state.main.selectedChallenge);
    const navigate = useNavigate();
    const [values, setValues] = useState<string[]>(Array(Object.keys(challange ? challange.list.words : []).length).fill(""));
    const [isAllowedNext, setIsAllowedNext] = useState(false);
    const [isDisbledBackBtn, setIsDisabledBackBtn] = useState(false);
    const [isShowFailedModal, setIsShowFailedModal] = useState(false);
    const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
    const [isShowExampleModal, setIsShowExampleModal] = useState(false);
    const [invalidFieldIndexes, setInvalidFieldIndexes] = useState<number[]>([]);
    const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!challange) {
            navigate("/categories");
        }
    }, [challange, navigate]);

    useEffect(() => {
        const allFilled = values.every(val => val.length > 0);
        setIsAllowedNext(allFilled);
    }, [values]);

    useEffect(()=> {
        if (!window.localStorage.getItem("complete-challange-example")) {
            setIsShowExampleModal(true);
        }

        if (wordRefs && wordRefs.current && wordRefs.current[0] && window.localStorage.getItem("complete-challange-example")) {
            wordRefs.current[0].focus();
        }
    }, []);

    const handleChangeValues = (index: number, value: string) => {
        const invalidIndexes = invalidFieldIndexes.filter(idx => idx !== index);

        setValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;

            return newValues;
        });

        setIsDisabledBackBtn(true);
        setInvalidFieldIndexes(invalidIndexes);
    }

    const handleShowInvalidFields = () => {
        if (!challange) return false;

        let correctValues = challange.step === 1 ? Object.values(challange.list.words) : Object.keys(challange.list.words)
        const invalidIndexes: number[] = [];

        values.forEach((value, index) => {
            if (value && correctValues[index] && value.toLowerCase() !== correctValues[index].toLowerCase()) {
                invalidIndexes.push(index);
            }
        });

        setInvalidFieldIndexes(invalidIndexes);
        setIsShowFailedModal(false);

        if (invalidIndexes.length > 0) {
            const firstInvalidIndex = invalidIndexes[0];
            wordRefs.current[firstInvalidIndex]?.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    const checkValidValues = (): boolean => {
        if (!challange) return false;

        let isExistInvalid: boolean = false;
        let correctValues = challange.step === 1 ? Object.values(challange.list.words) : Object.keys(challange.list.words)

        values.forEach((value, index) => {
            if (value && correctValues[index] && value.toLowerCase() !== correctValues[index].toLowerCase()) {
                isExistInvalid = true;
            }
        });

        return !isExistInvalid;
    }

    const handleClickNext: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (checkValidValues()) {
            if (!challange) return;

            if (challange.step === 1) {
                const target = e.target as HTMLButtonElement;

                dispatch(setVisibleOverlay(true));

                if (target) {
                    target.style.pointerEvents = "none";
                }

                dispatch(setChallenge({
                    ...challange,
                    step: challange.step + 1
                }));

                setValues(Array(Object.keys(challange ? challange.list.words : []).length).fill(""));

                setTimeout(() => {
                    dispatch(setVisibleOverlay(false));

                    if (target) {
                        target.style.pointerEvents = "";
                    }
                }, 1500);
            } else {
                setIsShowSuccessModal(true);
            }
        } else {
            setIsShowFailedModal(true);
        }
    }

    const handleCloseExampleModal = () => {
        window.localStorage.setItem("complete-challange-example", "1");
        setIsShowExampleModal(false);

        if (wordRefs && wordRefs.current && wordRefs.current[0]) {
            wordRefs.current[0].focus();
        }
    }

    return (
        challange ?
            <div className="challange">
                <Modal
                    isActive={isShowExampleModal}
                    onClose={handleCloseExampleModal}
                >
                    <div className="challange-example">
                        <div className="challange-example__text">
                            Если вам нужна помощь с переводом, кликните на иконку <span>
                            <svg width="16" height="16"
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.2 12H8.8V7.2H7.2V12ZM8 5.6C8.22666 5.6 8.4168 5.5232 8.5704 5.3696C8.724 5.216 8.80053 5.02613 8.8 4.8C8.79946 4.57387 8.72266 4.384 8.5696 4.2304C8.41653 4.0768 8.22666 4 8 4C7.77333 4 7.58346 4.0768 7.4304 4.2304C7.27733 4.384 7.20053 4.57387 7.2 4.8C7.19946 5.02613 7.27626 5.21627 7.4304 5.3704C7.58453 5.52453 7.7744 5.60107 8 5.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9493 3.06 14.3795 2.34 13.66C1.62 12.9405 1.05013 12.0939 0.630401 11.12C0.210668 10.1461 0.000534346 9.10613 1.01266e-06 8C-0.00053232 6.89386 0.209601 5.85387 0.630401 4.88C1.0512 3.90613 1.62107 3.05947 2.34 2.34C3.05893 1.62053 3.9056 1.05067 4.88 0.6304C5.8544 0.210133 6.8944 0 8 0C9.10559 0 10.1456 0.210133 11.12 0.6304C12.0944 1.05067 12.9411 1.62053 13.66 2.34C14.3789 3.05947 14.9491 3.90613 15.3704 4.88C15.7917 5.85387 16.0016 6.89386 16 8C15.9984 9.10613 15.7883 10.1461 15.3696 11.12C14.9509 12.0939 14.3811 12.9405 13.66 13.66C12.9389 14.3795 12.0923 14.9496 11.12 15.3704C10.1477 15.7912 9.10773 16.0011 8 16ZM8 14.4C9.78666 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78666 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78666 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78666 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z"
                                fill="#A8C7FA"/>
                            </svg>
                            </span> в углу карточки.
                        </div>

                        <div className="challange-example__preview">
                            <img src="/images/card_hint_example.webp" alt="hint"/>
                        </div>

                        <div className="modal__actions">
                            <FlatButton onClick={handleCloseExampleModal}>{t("Понятно")}</FlatButton>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isActive={isShowFailedModal}
                    onClose={() => setIsShowFailedModal(false)}
                >
                    <div className="challange-failed">
                        <div className="modal__row">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 22.5C15.425 22.5 15.7815 22.356 16.0695 22.068C16.3575 21.78 16.501 21.424 16.5 21V15C16.5 14.575 16.356 14.219 16.068 13.932C15.78 13.645 15.424 13.501 15 13.5C14.576 13.499 14.22 13.643 13.932 13.932C13.644 14.221 13.5 14.577 13.5 15V21C13.5 21.425 13.644 21.7815 13.932 22.0695C14.22 22.3575 14.576 22.501 15 22.5ZM15 10.5C15.425 10.5 15.7815 10.356 16.0695 10.068C16.3575 9.78 16.501 9.424 16.5 9C16.499 8.576 16.355 8.22 16.068 7.932C15.781 7.644 15.425 7.5 15 7.5C14.575 7.5 14.219 7.644 13.932 7.932C13.645 8.22 13.501 8.576 13.5 9C13.499 9.424 13.643 9.7805 13.932 10.0695C14.221 10.3585 14.577 10.502 15 10.5ZM15 30C12.925 30 10.975 29.606 9.15 28.818C7.325 28.03 5.7375 26.9615 4.3875 25.6125C3.0375 24.2635 1.969 22.676 1.182 20.85C0.395002 19.024 0.0010019 17.074 1.89873e-06 15C-0.000998101 12.926 0.393002 10.976 1.182 9.15C1.971 7.324 3.0395 5.7365 4.3875 4.3875C5.7355 3.0385 7.323 1.97 9.15 1.182C10.977 0.394 12.927 0 15 0C17.073 0 19.023 0.394 20.85 1.182C22.677 1.97 24.2645 3.0385 25.6125 4.3875C26.9605 5.7365 28.0295 7.324 28.8195 9.15C29.6095 10.976 30.003 12.926 30 15C29.997 17.074 29.603 19.024 28.818 20.85C28.033 22.676 26.9645 24.2635 25.6125 25.6125C24.2605 26.9615 22.673 28.0305 20.85 28.8195C19.027 29.6085 17.077 30.002 15 30Z"
                                    fill="#B9443C"/>
                            </svg>
                            <span>{t("Уппс...")}</span>
                        </div>

                        <div className="modal__title failed">
                            {t("Есть ошибки!")}
                        </div>

                        <div className="modal__actions">
                            <FlatButton
                                onClick={() => setIsShowFailedModal(false)}>{t("Хорошо, я найду сам")}</FlatButton>
                            <FlatButton onClick={handleShowInvalidFields}>{t("Показать ошибки")}</FlatButton>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isActive={isShowSuccessModal}
                    onClose={() => setIsShowSuccessModal(false)}
                >
                    <div className="challange-success">
                        <div className="modal__row">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M15 30C16.9698 30 18.9204 29.612 20.7403 28.8582C22.5601 28.1044 24.2137 26.9995 25.6066 25.6066C26.9995 24.2137 28.1044 22.5601 28.8582 20.7403C29.612 18.9204 30 16.9698 30 15C30 13.0302 29.612 11.0796 28.8582 9.25975C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387986 16.9698 -2.93527e-08 15 0C11.0218 5.92805e-08 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30ZM14.6133 21.0667L22.9467 11.0667L20.3867 8.93333L13.22 17.5317L9.51167 13.8217L7.155 16.1783L12.155 21.1783L13.445 22.4683L14.6133 21.0667Z"
                                      fill="#76AC3D"/>
                            </svg>
                            <span>{t("Cупер!")}</span>
                        </div>

                        <div className="modal__title success">
                            {t("Все слова правильные")}.
                        </div>

                        <div className="modal__actions">
                            <Link to="/categories">
                                <FlatButton>{t("В меню")}</FlatButton>
                            </Link>
                        </div>
                    </div>
                </Modal>

                <div className="container content-container">
                    <div className="navigation">
                        <div className="navigation__row breadcrumps">
                            <div className="breadcrumps__title">{t("Категория")}:</div>
                            <div className="breadcrumps__value">{category?.name}</div>
                        </div>
                        <div className="navigation__row breadcrumps">
                            <div className="breadcrumps__title">{t("Лист")}:</div>
                            <div className="breadcrumps__value">{challange.list.name}</div>
                        </div>
                    </div>

                    <div className="info">
                        <div className="info__row">
                            <span>{t("Переведите на:")}</span>
                            <div className="info__label">
                                {
                                    challange.step === 1 ?
                                        challange.list.lang_2
                                        :
                                        challange.list.lang_1
                                }
                            </div>
                        </div>
                    </div>

                    <WordCardsList>
                        {
                            challange ?
                                Object.entries(challange.list.words).map(([word_1, word_2], index) => (
                                    <WordCard
                                        key={index}
                                        index={index}
                                        ref={el => wordRefs.current[index] = el}
                                        word={challange.step === 1 ? word_1 : word_2}
                                        hint={challange.step === 1 ? word_2 : word_1}
                                        value={values[index] || ""}
                                        isShowErr={invalidFieldIndexes.includes(index)}
                                        onChange={(e) => handleChangeValues(index, e.target.value)}
                                    />
                                ))
                                : null
                        }
                    </WordCardsList>

                    <Pagination
                        totalPages={2}
                        activePage={challange.step}
                    />

                    <div className="actions">
                        <Link className={`btn-back ${isDisbledBackBtn ? "disabled" : ""}`} to="/lists">
                            <svg width="14" height="27" viewBox="0 0 14 27" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1.5L1 13.5L13 25.5" stroke="#5B5D61" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </Link>

                        <Button
                            disabled={!isAllowedNext}
                            onClick={handleClickNext}
                        >
                            {t("Далее")}
                        </Button>
                    </div>
                </div>
            </div>
            :
            <div>No selected challange</div>
    );
};

export default Challange;
