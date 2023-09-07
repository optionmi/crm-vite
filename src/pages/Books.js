import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import booksAPI from '../api/booksAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

function Books() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publication_year: '',
  });

  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    booksAPI
      .getAllBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleDeleteBook = (bookId) => {
    booksAPI
      .deleteBook(bookId)
      .then(() => {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== bookId)
        );
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  };

  const handleCreateBook = (e) => {
    e.preventDefault();
    const bookData = {
      title: e.target.title.value,
      author: e.target.author.value,
      publication_year: e.target.publication_year.value,
    };

    booksAPI
      .createBook(bookData)
      .then((createdBook) => {
        setBooks((prevBooks) => [...prevBooks, createdBook]);
        setNewBook({
          title: '',
          author: '',
          publication_year: '',
        });
        handleClose();
      })
      .catch((error) => {
        console.error('Error creating book:', error);
      });
  };

  const handleEditBook = (book) => {
    setEditBook(book);
    handleShow();
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const updatedBookData = {
      title: e.target.title.value,
      author: e.target.author.value,
      publication_year: e.target.publication_year.value,
    };
    const bookId = editBook.id;
    booksAPI
      .updateBook(bookId, updatedBookData)
      .then((updatedBook) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? updatedBook : book
          )
        );
        setEditBook(null);
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating book:', error);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditBook(null);
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="publisher">
        <div className="header d-flex justify-content-between">
          <h4>Books</h4>
          <button onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} id="Add-Icon" /> Add Book
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="shadow-none">
            <Modal.Title className="text-center">
              {editBook ? 'Edit Book' : 'Add Book'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={
                editBook ? handleUpdateBook : handleCreateBook
              }
            >
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Title"
                  value={
                    editBook ? editBook.title : newBook.title
                  }
                  onChange={(e) =>
                    editBook
                      ? setEditBook({
                          ...editBook,
                          title: e.target.value,
                        })
                      : setNewBook({
                          ...newBook,
                          title: e.target.value,
                        })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  placeholder="Author"
                  value={
                    editBook ? editBook.author : newBook.author
                  }
                  onChange={(e) =>
                    editBook
                      ? setEditBook({
                          ...editBook,
                          author: e.target.value,
                        })
                      : setNewBook({
                          ...newBook,
                          author: e.target.value,
                        })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="publication_year">
                  Publication Year
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="publication_year"
                  placeholder="Publication Year"
                  value={
                    editBook
                      ? editBook.publication_year
                      : newBook.publication_year
                  }
                  onChange={(e) =>
                    editBook
                      ? setEditBook({
                          ...editBook,
                          publication_year: e.target.value,
                        })
                      : setNewBook({
                          ...newBook,
                          publication_year: e.target.value,
                        })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editBook ? 'Update' : 'Submit'}
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <h5>Title</h5>
              </div>
              <div className="col-3">
                <h5>Author</h5>
              </div>
              <div className="col-3">
                <h5>Publication Year</h5>
              </div>
              <div className="col-3">
                <h5>Actions</h5>
              </div>
            </div>
          </div>
        </div>
        {books.map((book) => (
          <div className="card" id="detail-card" key={book.id}>
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <h6>{book.title}</h6>
                </div>
                <div className="col-3">
                  <h6>{book.author}</h6>
                </div>
                <div className="col-3">
                  <h6>{book.publication_year}</h6>
                </div>
                <div className="col-3">
                  <button
                    onClick={() => handleEditBook(book)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteBook(book.id)
                    }
                  >
                    <FontAwesomeIcon
                      id="trash-icon"
                      icon={faTrash}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
