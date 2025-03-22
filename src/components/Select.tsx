import {SelectHTMLAttributes} from "react";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string | null,
    options: string[] | Record<string, string>,
}

const Select = ({value, options, label = null, id = crypto.randomUUID(), ...props}: IProps) => {
    return (
        <div className="select-field">
            {
                label ?
                    <label htmlFor={id}>{label}</label>
                    : null
            }
            <div className="select">
                <select id={id} className="select" {...props} value={value}>
                    {
                        Array.isArray(options) ?
                            options.map((val) => (
                                <option
                                    key={val}
                                    value={val}
                                >
                                    {val}
                                </option>
                            ))
                            :
                            Object.entries(options).map(([key, value]) => (
                                <option
                                    key={value}
                                    value={value}
                                >
                                    {key}
                                </option>
                            ))
                    }
                </select>
                <svg className="select-handler" width="14" height="8" viewBox="0 0 14 8" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.355 1.66005e-06L7 4.94467L1.645 7.23756e-07L-3.87373e-07 1.52227L7 8L14 1.52227L12.355 1.66005e-06Z"
                        fill="#E3E3E3"/>
                </svg>
            </div>
        </div>
    );
};

export default Select;