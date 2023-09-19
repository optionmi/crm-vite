import axios from "axios";

const BASE_URL = "http://localhost:8000";

const booksAPI = {
    getAllBooks: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/books/all`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            let data = await response.json();
            return data.books;
        } catch (error) {
            throw error;
        }
    },

    getBookById: async (bookId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/books/${bookId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createBook: async (bookData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/books/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: bookData.title,
                    author: bookData.author,
                    standard: bookData.standard,
                    subject: bookData.subject,
                    price: parseInt(bookData.price),
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateBook: async (bookId, bookData) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/books/${bookId}`,
                bookData
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteBook: async (bookId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/api/books/${bookId}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default booksAPI;
