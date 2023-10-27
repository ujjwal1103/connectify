import { v4 as uuid } from 'uuid'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const pagesToShow = 2; // Adjust this value to determine how many pages to show before and after the selected page.

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    console.log(uuid())
    const renderPageNumbers = () => {
        const pagesToRender = [];

        // Show the first page
        pagesToRender.push(
            <li key={uuid()}>
                <button
                    onClick={() => onPageChange(1)}
                    className={`px-3 py-2 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-800'
                        }`}
                >
                    1
                </button>
            </li>
        );

        // Show the previous page if not on the first page
        if (currentPage > 1) {
            pagesToRender.push(
                <li key="prev">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className={`px-3 py-2 bg-white hover:bg-gray-200 text-gray-800`}
                    >
                        &laquo;
                    </button>
                </li>
            );
        }

        // Calculate the range of pages to show before and after the selected page
        const startPage = Math.max(2, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages - 1, currentPage + Math.floor(pagesToShow / 2));

        // Render the pages within the range
        for (let page = startPage; page <= endPage; page++) {
            pagesToRender.push(
                <li key={uuid().toString()}>
                    <button
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-800'
                            }`}
                    >
                        {page}
                    </button>
                </li>
            );
        }

        // Show the next page if not on the last page
        if (currentPage < totalPages) {
            pagesToRender.push(
                <li key="next">
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className={`px-3 py-2 bg-white hover:bg-gray-200 text-gray-800`}
                    >
                        &raquo;
                    </button>
                </li>
            );
        }

        // Show the last page
        pagesToRender.push(
            <li key={totalPages}>
                <button
                    onClick={() => onPageChange(totalPages)}
                    className={`px-3 py-2 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-800'
                        }`}
                >
                    {totalPages}
                </button>
            </li>
        );

        return pagesToRender;
    };

    return (
        <div className="flex justify-center mt-4">
            <ul className="flex space-x-2">
                {renderPageNumbers()}
            </ul>
        </div>
    );
};

export default Pagination;
