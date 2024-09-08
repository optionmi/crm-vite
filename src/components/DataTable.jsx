import { useTable, usePagination } from "react-table";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useState } from "react";
import { FormControl, Pagination } from "react-bootstrap";

export default function DataTable({
    columns,
    data,
    fetchData,
    loading,
    totalCount,
    pageSize,
    searchData,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            pageCount: Math.ceil(totalCount / 10), // Change 10 to your page size
        },
        usePagination
    );

    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        fetchData({ pageIndex });
    }, [pageIndex]);

    // const fetchNextPage = () => {
    //     setCurPage((prev) => prev + 1);
    //     fetchData({ pageIndex: curPage });
    //     nextPage();
    // };

    // const fetchPreviousPage = () => {
    //     setCurPage((prev) => prev - 1);
    //     fetchData({ pageIndex: curPage });
    //     previousPage();
    // };

    return (
        <>
            <div className="d-flex justify-content-between align-items-start pagination">
                <FormControl
                    className="w-25"
                    placeholder="Search here..."
                    onChange={searchData}
                ></FormControl>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    />
                    <Pagination.Next
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    />
                </Pagination>
            </div>

            <Table {...getTableProps()} striped bordered hover responsive>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th>#</th>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                <td>{pageIndex * pageSize + i + 1}</td>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {loading && <div>Loading...</div>}
        </>
    );
}
