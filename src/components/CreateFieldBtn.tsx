import {ButtonHTMLAttributes} from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

const CreateFieldBtn = ({...props}: IProps) => {
    return (
        <button className={`create-field-btn ${props.className ?? ""}`} {...props}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17 2.125C13.0697 2.17269 9.31385 3.75518 6.53452 6.53452C3.75518 9.31385 2.17269 13.0697 2.125 17C2.17269 20.9303 3.75518 24.6861 6.53452 27.4655C9.31385 30.2448 13.0697 31.8273 17 31.875C20.9303 31.8273 24.6861 30.2448 27.4655 27.4655C30.2448 24.6861 31.8273 20.9303 31.875 17C31.8273 13.0697 30.2448 9.31385 27.4655 6.53452C24.6861 3.75518 20.9303 2.17269 17 2.125ZM25.5 18.0625H18.0625V25.5H15.9375V18.0625H8.5V15.9375H15.9375V8.5H18.0625V15.9375H25.5V18.0625Z"
                    fill="#A8C7FA"/>
            </svg>
        </button>
    );
};

export default CreateFieldBtn;