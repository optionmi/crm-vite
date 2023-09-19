import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import booksAPI from '../api/booksAPI';
import AuthContext from '../context/AuthContext';


function Books() {
  let {authToken} = useContext(AuthContext)
  const [books, setBooks] = useState([]);

  useEffect(() => {
    booksAPI
      .getAllBooks(authToken)
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="publisher">
        <div className="header d-flex justify-content-between">
          <h4>Books</h4>
          <a className='btn btn-primary create-btn' href='/create/book'>Create Books</a>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <h5>Title</h5>
              </div>
              <div className="col-3">
                <h5>Standard</h5>
              </div>
              <div className="col-3">
                <h5>Price</h5>
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
                  <h6>{book.standard}</h6>
                </div>
                <div className="col-3">
                  <h6>{book.price}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
