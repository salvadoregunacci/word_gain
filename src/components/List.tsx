import {useAppDispatch} from "../hooks.ts";
import {setChallenge} from "../redux/slices/mainSlice.ts";
import {HTMLAttributes, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {IList} from "../types.ts";

interface IProps extends HTMLAttributes<HTMLDivElement> {
    list: IList;
    onLongPress?: () => void;
    longPressDelay?: number;
}

const List = ({list, onLongPress, longPressDelay = 500, ...props}: IProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const timerRef = useRef<number | null>(null);

    function handleClick() {
        dispatch(
            setChallenge({
                step: 1,
                list,
            })
        );

        navigate("/challange");
    }

    const handleMouseDown = () => {
        if (onLongPress) {
            timerRef.current = window.setTimeout(() => {
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
            className={`list fadeInDown item ${props.className ?? ""}`}
            {...props}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            <div className="list__preview">
                <svg width="74" height="88" viewBox="0 0 74 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M57.1818 10.1538H74V88H0V10.1538H16.8182V16.9231H57.1818V10.1538ZM13.4545 44H60.5455V37.2308H13.4545V44ZM13.4545 71.0769H60.5455V64.3077H13.4545V71.0769ZM23.5455 10.1538V0H50.4545V10.1538H23.5455Z"
                        fill="#383B3D"/>
                </svg>
                <div className="items-count">{Object.keys(list.words).length}</div>
            </div>
            <div className="list__title item-title">{list.name}</div>
        </div>
    );
};

export default List;
