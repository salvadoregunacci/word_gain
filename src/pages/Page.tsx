import React, {ReactNode, useEffect} from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    children: ReactNode,
}

const Page = ({title, children, ...props}: IProps) => {
    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <div
            className={`page ${props.className ? props.className : ""}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Page;