import {ButtonHTMLAttributes, ReactNode} from "react";
import {ViewType, ViewVariant} from "../types.ts";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    viewType?: ViewType,
    variant?: ViewVariant,
}

const Button = ({children, viewType = ViewType.filled, variant = ViewVariant.primary, ...props}: IProps) => {
    return (
        <button
            className={`btn ${viewType} ${variant}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;