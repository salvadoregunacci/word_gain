import {ButtonHTMLAttributes, ReactNode} from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    className?: string,
}

const MiniButton = ({children, className, ...props}: IProps) => {
    return (
        <button className={`btn mini-btn ${className ? className : ""}`} {...props}>
            {children}
        </button>
    );
};

export default MiniButton;