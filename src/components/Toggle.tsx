import {InputHTMLAttributes} from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,

}

const Toggle = ({className = "", id = crypto.randomUUID(), ...props}: IProps) => {
    return (
        <div className={`toogle-field ${className}`}>
            <input type="checkbox" className="toggle" id={id} {...props} hidden/>
            <label htmlFor={id}></label>
        </div>
    );
};

export default Toggle;