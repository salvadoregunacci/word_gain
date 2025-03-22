import Page from "./Page.tsx";
import Header from "../components/Header.tsx";
import Challange from "../components/Challange.tsx";

const ChallengePage = () => {
    return (
        <Page title="Challange">
            <Header/>
            <div className="page-content challange-page">
                <Challange/>
            </div>
        </Page>
    );
};

export default ChallengePage;