import {useTranslation} from "react-i18next";
import {ChangeEvent, forwardRef, useState} from "react";

interface IProps {
    index: number;
    word: string;
    hint?: string;
    value: string;
    isShowErr?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    isCreatedMode?: boolean,
}

const WordCard = forwardRef<HTMLInputElement, IProps>(
    ({
         index,
         word,
         hint,
         value,
         isShowErr = false,
         isCreatedMode = false,
         onChange
     }, ref) => {
        const {t} = useTranslation();
        const [isShowHint, setIsShowHint] = useState(false);

        function handleChange(e: ChangeEvent<HTMLInputElement>) {
            onChange(e);
        }

        function handleVisibleHint() {
            setIsShowHint(true);

            setTimeout(() => {
                setIsShowHint(false);
            }, 3000);
        }

        return (
            <div
                className={`word-card ${isShowErr ? "show-err" : ""} ${isShowHint ? "show-hint" : ""} ${isCreatedMode ? "created-mode" : ""}`}>
                <div className="word-card__header">
                    <div className="word-card__index">{index + 1}</div>
                    <div className="word-card__header-wrap">
                        <div className="word-card__target">{word.toLowerCase()}</div>
                        <button className="word-card__hint-trigger" onClick={handleVisibleHint}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.2 12H8.8V7.2H7.2V12ZM8 5.6C8.22666 5.6 8.4168 5.5232 8.5704 5.3696C8.724 5.216 8.80053 5.02613 8.8 4.8C8.79946 4.57387 8.72266 4.384 8.5696 4.2304C8.41653 4.0768 8.22666 4 8 4C7.77333 4 7.58346 4.0768 7.4304 4.2304C7.27733 4.384 7.20053 4.57387 7.2 4.8C7.19946 5.02613 7.27626 5.21627 7.4304 5.3704C7.58453 5.52453 7.7744 5.60107 8 5.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9493 3.06 14.3795 2.34 13.66C1.62 12.9405 1.05013 12.0939 0.630401 11.12C0.210668 10.1461 0.000534346 9.10613 1.01266e-06 8C-0.00053232 6.89386 0.209601 5.85387 0.630401 4.88C1.0512 3.90613 1.62107 3.05947 2.34 2.34C3.05893 1.62053 3.9056 1.05067 4.88 0.6304C5.8544 0.210133 6.8944 0 8 0C9.10559 0 10.1456 0.210133 11.12 0.6304C12.0944 1.05067 12.9411 1.62053 13.66 2.34C14.3789 3.05947 14.9491 3.90613 15.3704 4.88C15.7917 5.85387 16.0016 6.89386 16 8C15.9984 9.10613 15.7883 10.1461 15.3696 11.12C14.9509 12.0939 14.3811 12.9405 13.66 13.66C12.9389 14.3795 12.0923 14.9496 11.12 15.3704C10.1477 15.7912 9.10773 16.0011 8 16ZM8 14.4C9.78666 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78666 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78666 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78666 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z"
                                    fill="#A8C7FA"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="word-card__body">
                    <div className="word-card__input">
                        <input
                            ref={ref}
                            type="text"
                            placeholder={t("Введите перевод...")}
                            className="word-input"
                            value={value}
                            onChange={handleChange}
                        />
                    </div>
                    {
                        isCreatedMode ?
                            null :
                            <div className="word-card__hint">{hint}</div>
                    }
                </div>
            </div>
        );
    }
);

export default WordCard;
