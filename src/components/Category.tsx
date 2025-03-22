import {forwardRef, HTMLAttributes, useRef} from "react";
import {IList} from "../types.ts";
import {useAppDispatch} from "../hooks.ts";
import {setSelectedCategory} from "../redux/slices/mainSlice.ts";
import {useNavigate} from "react-router-dom";

interface IProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    lists: IList[];
    onLongPress?: () => void;
    longPressDelay?: number;
}

const Category = forwardRef<HTMLDivElement, IProps>(
    ({name, lists, onLongPress, longPressDelay = 500, ...props}, ref) => {
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
        const timerRef = useRef<number | null>(null);

        function handleClick() {
            dispatch(
                setSelectedCategory({
                    name,
                    lists,
                })
            );
            navigate("/lists");
        }

        const handleMouseDown = () => {
            if (onLongPress) {
                timerRef.current = setTimeout(() => {
                    onLongPress();
                }, longPressDelay);
            }
        };

        const handleMouseUp = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };

        return (
            <div
                ref={ref}
                className={`category fadeInDown item ${props.className ? props.className : ""}`}
                {...props}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >
                <div className="category__preview">
                    <svg width="119" height="93" viewBox="0 0 119 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.6836 93C7.63804 93 5.09717 91.977 3.06094 89.931C1.02472 87.885 0.00440741 85.3297 0 82.2651V10.7349C0 7.67471 1.02032 5.12164 3.06094 3.07564C5.10157 1.02964 7.64024 0.00442857 10.6769 0H39.1708C40.5944 0 41.9783 0.287858 43.3226 0.863572C44.6669 1.44814 45.8172 2.22093 46.7736 3.18193L56.8291 13.2857H108.323C111.364 13.2857 113.905 14.3109 115.946 16.3614C117.986 18.4118 119.004 20.9649 119 24.0206V82.2718C119 85.3275 117.982 87.8806 115.946 89.931C113.909 91.9814 111.369 93.0044 108.323 93H10.6836Z"
                            fill="#383B3D"/>
                    </svg>
                    <div className="category__lists-count items-count">{lists.length}</div>
                </div>
                <div className="category__title item-title">{name}</div>
            </div>
        );
    }
);

export default Category;
