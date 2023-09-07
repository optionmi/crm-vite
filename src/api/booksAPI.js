import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const booksAPI = {
  getAllBooks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books`);
      return response.data;
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

  createBook: async (bookData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/books/create`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateBook: async (bookId, bookData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/books/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default booksAPI;