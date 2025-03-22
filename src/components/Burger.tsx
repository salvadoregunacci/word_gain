import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {changeMenuVisability} from "../redux/slices/mainSlice.ts";

const Burger = () => {
    const isActive = useAppSelector(state => state.main.isOpenMenu);
    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(changeMenuVisability(!isActive));
    }

    return (
        <button
            className={`btn burger-btn ${isActive ? "_active" : ""}`}
            onClick={handleClick}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default Burger;