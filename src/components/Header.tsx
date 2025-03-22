import Logotype from "./Logotype.tsx";
import Burger from "./Burger.tsx";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <Logotype/>
                <Burger/>
            </div>
        </header>
    );
};

export default Header;