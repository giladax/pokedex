interface PageSelectorProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

const PageSelector: React.FC<PageSelectorProps> = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="page-selector">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>👈 </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>👉</button>
        </div>
    );
};

export default PageSelector;