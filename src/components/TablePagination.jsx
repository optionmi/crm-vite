import Pagination from "react-bootstrap/Pagination";

export default function TablePagination({ page, setPage, totalPages }) {
    let items = [];

    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === page}
                onClick={() => setPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>
            <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
            {items}
            <Pagination.Next
                onClick={() =>
                    setPage(page < totalPages ? page + 1 : totalPages)
                }
            />
        </Pagination>
    );
}
