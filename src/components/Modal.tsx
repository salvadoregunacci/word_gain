import {HTMLAttributes, MouseEventHandler, ReactNode} from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
    isActive: boolean,
    children: ReactNode,
    onClose?: () => void
}

const Modal = ({isActive, children, onClose, ...props}: IProps) => {
    const handleClickClose: MouseEventHandler<HTMLButtonElement> = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
        <div className={`modal ${isActive ? "_active" : ""}`} {...props}>
            <div className="modal__content">
                <button className="btn modal__close-btn" onClick={handleClickClose}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 10.9163L2.29278 17.6236C2.04182 17.8745 1.72243 18 1.3346 18C0.946768 18 0.627376 17.8745 0.376425 17.6236C0.125475 17.3726 0 17.0532 0 16.6654C0 16.2776 0.125475 15.9582 0.376425 15.7072L7.08365 9L0.376425 2.29278C0.125475 2.04182 0 1.72243 0 1.3346C0 0.946768 0.125475 0.627376 0.376425 0.376425C0.627376 0.125475 0.946768 0 1.3346 0C1.72243 0 2.04182 0.125475 2.29278 0.376425L9 7.08365L15.7072 0.376425C15.9582 0.125475 16.2776 0 16.6654 0C17.0532 0 17.3726 0.125475 17.6236 0.376425C17.8745 0.627376 18 0.946768 18 1.3346C18 1.72243 17.8745 2.04182 17.6236 2.29278L10.9163 9L17.6236 15.7072C17.8745 15.9582 18 16.2776 18 16.6654C18 17.0532 17.8745 17.3726 17.6236 17.6236C17.3726 17.8745 17.0532 18 16.6654 18C16.2776 18 15.9582 17.8745 15.7072 17.6236L9 10.9163Z"
                            fill="#3E4044"/>
                    </svg>
                </button>

                <div className="container">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;