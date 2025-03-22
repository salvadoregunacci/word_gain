import {useTranslation} from "react-i18next";
import {HTMLAttributes} from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
    isActive: boolean,
    className?: string,
    onEdit?: () => void,
    onDelete?: () => void,
    onClose?: () => void,
}

const Options = ({isActive, onEdit, onDelete, onClose, className = "", ...props}: IProps) => {
    const {t} = useTranslation();

    function handleClickEdit() {
        if (onEdit) {
            onEdit();
        }
    }

    function handleClickDelete() {
        if (onDelete) {
            onDelete();
        }
    }

    function handleClickClose() {
        if (onClose) {
            onClose();
        }
    }

    return (
        <div className={`options ${isActive ? "_active" : ""} ${className}`} {...props}>
            <div className="options__bg"></div>
            <div className="options__content">
                <div className="options__actions">
                    <button className="btn options__actions-close-btn" onClick={handleClickClose}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M10.0114 12.6921L16.7467 19.4197C17.1041 19.7767 17.5888 19.9772 18.0943 19.9772C18.5997 19.9772 19.0844 19.7767 19.4418 19.4197C19.7992 19.0627 20 18.5785 20 18.0736C20 17.5688 19.7992 17.0846 19.4418 16.7276L12.704 10L19.4405 3.27238C19.6174 3.09562 19.7577 2.88579 19.8534 2.65487C19.9491 2.42395 19.9983 2.17646 19.9983 1.92654C19.9982 1.67662 19.9489 1.42915 19.8531 1.19828C19.7573 0.967401 19.6169 0.757635 19.4399 0.580956C19.2629 0.404275 19.0529 0.264142 18.8217 0.168555C18.5905 0.0729685 18.3427 0.0238009 18.0925 0.0238599C17.8423 0.0239188 17.5946 0.0732027 17.3634 0.168898C17.1323 0.264594 16.9223 0.404827 16.7454 0.58159L10.0114 7.30921L3.2761 0.58159C3.10044 0.399757 2.89028 0.254687 2.6579 0.154847C2.42551 0.0550063 2.17554 0.00239379 1.92258 7.98025e-05C1.66962 -0.00223418 1.41873 0.0457963 1.18456 0.141369C0.950377 0.236941 0.737599 0.378142 0.558637 0.556731C0.379675 0.735321 0.238113 0.947724 0.14221 1.18154C0.046308 1.41537 -0.00201381 1.66592 6.42879e-05 1.9186C0.00214238 2.17127 0.0545786 2.421 0.154314 2.65322C0.254049 2.88544 0.399086 3.09549 0.580961 3.27111L7.3188 10L0.582232 16.7289C0.400356 16.9045 0.25532 17.1146 0.155584 17.3468C0.0558492 17.579 0.00341238 17.8287 0.00133429 18.0814C-0.000743808 18.3341 0.047578 18.5846 0.14348 18.8185C0.239383 19.0523 0.380945 19.2647 0.559907 19.4433C0.738869 19.6219 0.951647 19.7631 1.18583 19.8586C1.42 19.9542 1.67089 20.0022 1.92385 19.9999C2.17681 19.9976 2.42678 19.945 2.65917 19.8452C2.89155 19.7453 3.10171 19.6002 3.27736 19.4184L10.0114 12.6921Z"
                                  fill="#5B5D61"/>
                        </svg>
                    </button>
                    <div className="options__actions-title">{t("Выберите действие:")}</div>
                    <div className="options__actions-wrap">
                        <button className="btn btn-with-icon edit" onClick={handleClickEdit}>
                            <div className="btn-with-icon__icon">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.243 15.9941H0V11.7449L11.435 0.293215C11.6225 0.105469 11.8768 0 12.142 0C12.4072 0 12.6615 0.105469 12.849 0.293215L15.678 3.12535C15.771 3.21836 15.8447 3.32881 15.8951 3.45039C15.9454 3.57196 15.9713 3.70228 15.9713 3.83389C15.9713 3.96549 15.9454 4.09581 15.8951 4.21739C15.8447 4.33896 15.771 4.44941 15.678 4.54242L4.243 15.9941ZM0 17.9971H18V20H0V17.9971Z"
                                        fill="#DC924E"/>
                                </svg>
                            </div>
                            <div className="btn-with-icon__text">
                                {t("Изменить")}
                            </div>
                        </button>

                        <button className="btn btn-with-icon delete" onClick={handleClickDelete}>
                            <div className="btn-with-icon__icon">
                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                                        fill="#B9443C"/>
                                </svg>
                            </div>
                            <div className="btn-with-icon__text">
                                {t("Удалить")}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Options;