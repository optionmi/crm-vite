import axios from "axios";

const quotesAPI = {
	createQuote: async (authToken, quoteData) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.post(
				`${import.meta.env.VITE_APP_BASEURL}/api/quotes/create`,
				quoteData,
				config
			);
			const data = {
				...res.data,
				resType: res.status === 201 ? "success" : "danger",
			};

			return data;
		} catch (error) {
			return {
				resType: "danger",
				message: error.message,
			};
		}
	},

	getEmailNotifications: async (authToken) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/emails/email-notifications`,
				config
			);
			const data = {
				...res.data,
				resType: res.status === 200 ? "success" : "danger",
			};

			return data;
		} catch (error) {
			return {
				resType: "danger",
				message: error.message,
			};
		}
	},

	getAllQuotes: async (authToken) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/quotes/all`,
				config
			);
			const data = {
				...res.data,
				resType: res.status === 200 ? "success" : "danger",
			};

			return data;
		} catch (error) {
			return {
				resType: "danger",
				message: error.message,
			};
		}
	},

	deleteQuoteByID: async (quoteID, authToken) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.delete(
				`${import.meta.env.VITE_APP_BASEURL}/api/quotes/${quoteID}`,
				config
			);
			const data = {
				...res.data,
				resType: res.status === 200 ? "success" : "danger",
			};
			return data;
		} catch (error) {
			return {
				resType: "danger",
				message: error.message,
			};
		}
	},

	getQuoteByID: async (authToken, quoteID) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/quotes/${quoteID}`,
				config
			);
			const data = {
				...res.data,
				resType: res.status === 200 ? "success" : "danger",
			};
			return data;
		} catch (error) {
			return {
				resType: "danger",
				message: error.message,
			};
		}
	},

	updateQuoteById: async (authToken, quoteID, quoteData) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.put(
				`${import.meta.env.VITE_APP_BASEURL}/api/quotes/${quoteID}`,
				quoteData,
				config
			);
			const data = {
				...res.data,
				resType: res.status === 200 ? "success" : "danger",
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

export default quotesAPI;
