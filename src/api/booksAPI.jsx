import axios from "axios";

const booksAPI = {
	getAllBooks: async (authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/books/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			let data = await response.json();
			return data.books;
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
			const searchUrl = `${
				import.meta.env.VITE_APP_BASEURL
			}/api/books?search=${term}`;

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

	getBookById: async (bookId, authToken) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/books/${bookId}`,
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	createBook: async (bookData, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/books/create`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(bookData),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	updateBook: async (bookId, bookData, authToken) => {
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_APP_BASEURL}/api/books/${bookId}`,
				bookData,
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	deleteBook: async (bookId, authToken) => {
		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_APP_BASEURL}/api/books/${bookId}`,
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);

			const data = {
				...response.data,
				resType: response.status === 200 ? "success" : "danger",
			};

			return data;
		} catch (error) {
			return {
				resType: "danger",
				message: error.message,
			};
		}
	},
};

export default booksAPI;
