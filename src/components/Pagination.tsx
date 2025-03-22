
interface IProps {
    totalPages: number,
    activePage: number,
}

const Pagination = ({totalPages, activePage}: IProps) => {
    return (
        <div className="pagination">
            {
                Array(totalPages).fill("").map((_, index) => (
                    <div
                        key={crypto.randomUUID()}
                        className={`pagination__item ${index + 1 === activePage ? "_active" : ""}`}
                    >
                    </div>
                ))
            }
        </div>
    );
};

export default Pagination;