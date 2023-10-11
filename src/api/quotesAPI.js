import axios from "axios";

const BASE_URL = "http://localhost:8000";

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
                `${BASE_URL}/api/quotes/create`,
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
                `${BASE_URL}/api/emails/email-notifications`,
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
            const res = await axios.get(`${BASE_URL}/api/quotes/all`, config);
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
                `${BASE_URL}/api/quotes/${quoteID}`,
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
                `${BASE_URL}/api/quotes/${quoteID}`,
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
                `${BASE_URL}/api/quotes/${quoteID}`,
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
