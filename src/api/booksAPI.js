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
            return data;
        } catch (error) {
            throw error;
        }
    },

    getBookByName: async (authToken, term) => {
        try {
            const headers = {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            };
            const searchUrl = `${BASE_URL}/api/books?search=${term}`;

            const response = await fetch(searchUrl, {
                method: "GET",
                headers: headers,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
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

    createBook: async (bookData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/books/create`,
                bookData
            );
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
