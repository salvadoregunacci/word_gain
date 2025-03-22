import {useTranslation} from "react-i18next";
import {HTMLAttributes} from "react";

interface IProps extends HTMLAttributes<HTMLDivElement>{

}

const NewCategoryBtn = ({...props}: IProps) => {
    const {t} = useTranslation();

    return (
        <div className={`list fadeInDown item list-new-btn ${props.className ?? ""}`} {...props}>
            <div className="list__preview">
                <svg width="74" height="88" viewBox="0 0 74 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.35">
                        <path
                            d="M57.1818 10.1538H74V88H0V10.1538H16.8182V16.9231H57.1818V10.1538ZM13.4545 44H60.5455V37.2308H13.4545V44ZM13.4545 71.0769H60.5455V64.3077H13.4545V71.0769ZM23.5455 10.1538V0H50.4545V10.1538H23.5455Z"
                            fill="#383B3D"/>
                        <rect x="11" y="30" width="53" height="43" fill="#383B3D"/>
                        <g clipPath="url(#clip0_42_175)">
                            <path
                                d="M37.6875 42.5C38.0356 42.5 38.3694 42.6383 38.6156 42.8844C38.8617 43.1306 39 43.4644 39 43.8125V50.375H45.5625C45.9106 50.375 46.2444 50.5133 46.4906 50.7594C46.7367 51.0056 46.875 51.3394 46.875 51.6875C46.875 52.0356 46.7367 52.3694 46.4906 52.6156C46.2444 52.8617 45.9106 53 45.5625 53H39V59.5625C39 59.9106 38.8617 60.2444 38.6156 60.4906C38.3694 60.7367 38.0356 60.875 37.6875 60.875C37.3394 60.875 37.0056 60.7367 36.7594 60.4906C36.5133 60.2444 36.375 59.9106 36.375 59.5625V53H29.8125C29.4644 53 29.1306 52.8617 28.8844 52.6156C28.6383 52.3694 28.5 52.0356 28.5 51.6875C28.5 51.3394 28.6383 51.0056 28.8844 50.7594C29.1306 50.5133 29.4644 50.375 29.8125 50.375H36.375V43.8125C36.375 43.4644 36.5133 43.1306 36.7594 42.8844C37.0056 42.6383 37.3394 42.5 37.6875 42.5Z"
                                fill="#A8C7FA"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M18 48.8C18 42.92 18 39.98 19.1445 37.7225C20.156 35.7473 21.7631 34.1403 23.7382 33.1288C25.9852 31.9843 28.9357 31.9843 34.8157 31.9843H40.5907C46.4707 31.9843 49.4107 31.9843 51.6682 33.1288C53.6449 34.1341 55.2382 35.7406 56.262 37.7225C57.4065 39.9695 57.4065 42.92 57.4065 48.8V54.575C57.4065 60.455 57.4065 63.395 56.262 65.6525C55.2505 67.6277 53.6434 69.2347 51.6682 70.2463C49.4212 71.3908 46.4707 71.3908 40.5907 71.3908H34.8157C28.9357 71.3908 25.9957 71.3908 23.7382 70.2463C21.7631 69.2347 20.156 67.6277 19.1445 65.6525C18 63.4055 18 60.455 18 54.575V48.8ZM34.8 34.625H40.575C43.5675 34.625 45.6412 34.625 47.2687 34.7589C48.8569 34.8901 49.7704 35.1316 50.4712 35.4834C51.9495 36.2411 53.1523 37.4439 53.91 38.9221C54.2617 39.6125 54.5032 40.526 54.6345 42.1246C54.7657 43.7443 54.7684 45.8259 54.7684 48.8184V54.5934C54.7684 57.5859 54.7684 59.6596 54.6345 61.2871C54.5032 62.8752 54.2617 63.7888 53.91 64.4896C53.1552 65.97 51.9516 67.1736 50.4712 67.9284C49.7809 68.2801 48.8674 68.5216 47.2687 68.6529C45.6491 68.7841 43.5675 68.7868 40.575 68.7868H34.8C31.8075 68.7868 29.7337 68.7868 28.1062 68.6555C26.5181 68.5243 25.6046 68.2801 24.9037 67.9284C23.4234 67.1736 22.2198 65.97 21.465 64.4896C21.1132 63.7993 20.8717 62.8884 20.7405 61.2871C20.6092 59.6675 20.6066 57.5859 20.6066 54.5934V48.8184C20.6066 45.8259 20.6066 43.7521 20.7405 42.1246C20.8717 40.5365 21.1132 39.623 21.465 38.9221C22.2227 37.4439 23.4255 36.2411 24.9037 35.4834C25.5941 35.1316 26.5076 34.8901 28.1062 34.7589C29.7259 34.6276 31.8075 34.625 34.8 34.625Z"
                                  fill="#A8C7FA"/>
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_42_175">
                            <rect width="39" height="42" fill="white" transform="translate(18 32)"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="list__title item-title">
                {t("Новый")}
            </div>
        </div>
    );
};

export default NewCategoryBtn;