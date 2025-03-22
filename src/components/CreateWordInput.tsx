import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    index: number;
    isFocus?: boolean;
    onSwipe?: (index: number) => void;
}

const CreateWordInput = ({ index, isFocus = false, onSwipe, ...props }: IProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [isSwiped, setIsSwiped] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isFocus) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 200);
        }
    }, [isFocus]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
        setOffsetX(0);
        setIsSwiped(false);
        setIsDeleting(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const deltaX = e.touches[0].clientX - startX;

        if (deltaX > 0) {
            setOffsetX(deltaX);
            setIsDeleting(deltaX > 70);
        }
    };

    const handleTouchEnd = () => {
        if (offsetX > 100 && index !== undefined && onSwipe) {
            setIsSwiped(true);
            onSwipe(index);
        } else {
            setOffsetX(0);
            setIsDeleting(false);
        }
    };

    return (
        <div
            className={`input-field ${isDeleting ? "is-deleting" : ""}`}
            style={{
                transform: `translateX(${isSwiped ? "100%" : offsetX + "px"})`,
                transition: isSwiped ? "transform 0.2s ease-out" : "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <input type="text" {...props} ref={inputRef} />
            {index !== null && <div className="input-index">{index}</div>}

            <div className="delete-icon">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#B9443C"/>
                </svg>
            </div>
        </div>
    );
};

export default CreateWordInput;