import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import booksAPI from "../../api/booksAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import subjectAPI from "../../api/subjectAPI";
import seriesAPI from "../../api/seriesAPI";
import boardsAPI from "../../api/boardAPI";

function CreateBook() {
    let { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const { bookID } = useParams();
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        board_id: "",
        publisher_id: "",
        subject_id: "",
        series_id: "",
        standard: "",
        price: "",
    });
    const [boards, setBoards] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [series, setSeries] = useState([]);
    const [selectableSeries, setSelectableSeries] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await booksAPI.getBookById(bookID, authToken);
                // console.log(data);
                setBookData(data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchData = async () => {
            try {
                const [boards, subjects, series] = await Promise.all([
                    boardsAPI.getAllBoard(authToken),
                    subjectAPI.getAllSubject(authToken),
                    seriesAPI.getAllSeries(authToken),
                ]);

                setBoards(boards);
                setSubjects(subjects);
                setSeries(series);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        if (bookID) {
            fetchBook();
        }
    }, []);

    useEffect(() => {
        setSelectableSeries(
            series.filter((s) => s.subject_id == bookData.subject_id)
        );
    }, [bookData, series]);

    const handleCreateBook = (e) => {
        e.preventDefault();
        booksAPI
            .createBook(bookData, authToken)
            .then(() => {
                navigate("/books");
            })
            .catch((error) => {
                console.error("Error creating book:", error);
            });
    };

    const handleUpdateBookSubmit = (e) => {
        e.preventDefault();
        booksAPI.updateBook(bookID, bookData, authToken).then(() => {
            navigate("/books");
        });
    };

    const handleSubjectChange = (e) => {
        const { value } = e.target;

        setSelectableSeries((prevSeries) =>
            series.filter((s) => s.subject_id == value)
        );

        setBookData((prevBookData) => ({
            ...prevBookData,
            subject_id: value,
        }));
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="books">
                <h4>{bookID ? "Update" : "Create"} Book</h4>
                <Card
                    className="create-books-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-books-card-body">
                        <Form
                            className="create-books-form"
                            onSubmit={
                                bookID
                                    ? handleUpdateBookSubmit
                                    : handleCreateBook
                            }
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="subject"
                                        className="create-books-form-group"
                                    >
                                        <Form.Label>Board</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={bookData.board_id}
                                            onChange={(e) =>
                                                setBookData((prevData) => ({
                                                    ...prevData,
                                                    board_id: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                Select Board
                                            </option>
                                            {boards.map((board) => (
                                                <option
                                                    key={board.id}
                                                    value={board.id}
                                                >
                                                    {board.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="subject"
                                        className="create-books-form-group"
                                    >
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={bookData.subject_id}
                                            onChange={(e) =>
                                                handleSubjectChange(e)
                                            }
                                        >
                                            <option value="">
                                                Select Subject
                                            </option>
                                            {subjects.map((subject) => (
                                                <option
                                                    key={subject.id}
                                                    value={subject.id}
                                                >
                                                    {subject.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="subject"
                                        className="create-books-form-group"
                                    >
                                        <Form.Label>Series</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={bookData.series_id}
                                            onChange={(e) =>
                                                setBookData({
                                                    ...bookData,
                                                    series_id: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Select Series
                                            </option>
                                            {selectableSeries.map((series) => (
                                                <option
                                                    key={series.id}
                                                    value={series.id}
                                                >
                                                    {series.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="name"
                                        className="create-books-form-group"
                                    >
                                        <Form.Label>Book Title</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            placeholder="Title"
                                            name="title"
                                            required
                                            value={bookData.title}
                                            onChange={(e) =>
                                                setBookData({
                                                    ...bookData,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="author"
                                        className="create-books-form-group"
                                    >
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Author"
                                            name="author"
                                            required
                                            value={bookData.author}
                                            onChange={(e) =>
                                                setBookData({
                                                    ...bookData,
                                                    author: e.target.value,
                                                })
                                            }
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="standard"
                                        className="create-books-form-group"
                                    >
                                        <Form.Label>Standard</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-control"
                                            name="standard"
                                            required
                                            value={bookData.standard}
                                            onChange={(e) =>
                                                setBookData({
                                                    ...bookData,
                                                    standard: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Select a standard
                                            </option>
                                            {Array.from(
                                                { length: 12 },
                                                (_, i) => (
                                                    <option
                                                        key={i + 1}
                                                        value={`Class ${i + 1}`}
                                                    >
                                                        Class {i + 1}
                                                    </option>
                                                )
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="price"
                                        className="create-books-form-group"
                                    >
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="number"
                                            placeholder="Price"
                                            name="price"
                                            required
                                            value={bookData.price}
                                            onChange={(e) =>
                                                setBookData({
                                                    ...bookData,
                                                    price: e.target.value,
                                                })
                                            }
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-books-form-group create-books-button"
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateBook;
