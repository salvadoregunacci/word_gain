import React, {InputHTMLAttributes} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    fieldLabel?: string | null,
    className?: string,
}

const Input = React.forwardRef<HTMLInputElement, IProps>(({
                                    className = "",
                                    fieldLabel = null,
                                    id = crypto.randomUUID(),
                                    ...props
                                }: IProps,
                                ref) => {
    return (
        <div className={`field ${className}`}>
            {
                fieldLabel ?
                    <label htmlFor={id}>
                        {fieldLabel}
                    </label>
                    : null
            }
            <div className="input-field">
                <input type="text" id={id} ref={ref} {...props} />
            </div>
        </div>
    );
})

export default Input;