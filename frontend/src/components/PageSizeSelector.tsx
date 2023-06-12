const PageSizeSelector: React.FC<{ pageSize: number; setPageSize: (size: number) => void }> = ({ pageSize, setPageSize }) => {
    return (
        <div>
            <label htmlFor="pageSize">Page Size:</label>
            <select
                className="p-2 m-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700"
                id="pageSize"
                value={pageSize}
                onChange={(e) => setPageSize(parseInt(e.target.value))}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    );
};

export default PageSizeSelector;
