import {ButtonHTMLAttributes, ReactNode} from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    viewVariant?: "green"
}

const FlatButton = ({children, viewVariant = "green", ...props}: IProps) => {
    return (
        <button
            className={`btn flat-btn ${viewVariant} ${props.className ?? ""}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default FlatButton;