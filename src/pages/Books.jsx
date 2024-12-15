import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import booksAPI from "../api/booksAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function Books() {
    let { authToken } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [notification, setNotification] = useState({
        type: "",
        message: "",
        show: false,
    });

    useEffect(() => {
        booksAPI
            .getAllBooks(authToken)
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    }, []);

    const handleDelete = async (bookID) => {
        const data = await booksAPI.deleteBook(bookID, authToken);
        console.log(data);
        setNotification({
            type: data.resType,
            message: data.message,
            show: true,
        });
        if (data.resType === "success") {
            setBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== bookID)
            );
        }
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="books">
                <div className="header d-flex justify-content-between">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Books
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/book"
                    >
                        Create Books
                    </Link>
                </div>

                <Card>
                    <div className="card-body">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "50%" }}>Book</th>
                                    <th style={{ width: "10%" }}>Class</th>
                                    <th style={{ width: "10%" }}>Price</th>
                                    <th style={{ width: "20%" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books?.map((book, index) => (
                                    <tr key={book.id}>
                                        <td>{index + 1}</td>
                                        <td>{book.title}</td>
                                        <td>{book.standard}</td>
                                        <td>₹ {book.price}</td>
                                        <td className="d-flex gap-3">
                                            <Link
                                                className="btn btn-sm btn-success"
                                                to={`/update-book/${book.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <DeleteConfirmationModal
                                                handleDelete={() =>
                                                    handleDelete(book.id)
                                                }
                                                notification={notification}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Books;
