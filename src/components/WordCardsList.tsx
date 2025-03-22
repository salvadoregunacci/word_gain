import {HTMLAttributes, ReactNode, useEffect, useRef, useState, useCallback} from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    className?: string,
    isScrollToBottom?: boolean,
}

const WordCardsList = ({className, children, isScrollToBottom = false, ...props}: IProps) => {
    const [isOverflow, setIsOverflow] = useState(false);
    const [isEndScroll, setIsEndScroll] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const checkOverflow = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        requestAnimationFrame(() => {
            const hasOverflow = container.scrollHeight > container.clientHeight;
            setIsOverflow(hasOverflow);
            setIsEndScroll(container.scrollTop + container.clientHeight >= container.scrollHeight - 1);
        });
    }, []);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (container) {
            setIsEndScroll(container.scrollTop + container.clientHeight >= container.scrollHeight - 1);
        }
    }, []);

    const scrollToBottom = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollTo({top: container.scrollHeight, behavior: "smooth"});
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        checkOverflow();

        const observer = new ResizeObserver(checkOverflow);
        observer.observe(container);

        const mutationObserver = new MutationObserver(checkOverflow);
        mutationObserver.observe(container, {childList: true, subtree: true});

        window.addEventListener("resize", checkOverflow);

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
            window.removeEventListener("resize", checkOverflow);
        };
    }, [children, checkOverflow]);

    useEffect(()=> {
        if (isScrollToBottom) {
            scrollToBottom();
        }
    }, [isScrollToBottom])

    return (
        <div
            className={`word-cards ${className ? className : ""} ${isOverflow ? "is-overflow" : ""} ${isEndScroll ? "is-end-scroll" : ""}`}
            {...props}
        >
            <div ref={containerRef} className="word-cards__container no-scrollbar" onScroll={handleScroll}>
                <div className="word-cards__content">{children}</div>
            </div>
        </div>
    );
};

export default WordCardsList;
