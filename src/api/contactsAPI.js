import axios from "axios";

const BASE_URL = "http://localhost:8000";

const contactsAPI = {
    getAllContacts: async (authToken, pageIndex, pageSize) => {
        try {
            const url = `${BASE_URL}/api/contacts/all?page=${
                pageIndex + 1
            }&pageSize=${pageSize}`;
            const headers = {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            };

            const response = await fetch(url, {
                method: "GET",
                headers: headers,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },

    getContactById: async (authToken, contactID) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.get(
                `${BASE_URL}/api/contacts/${contactID}`,
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

    getContactByName: async (authToken, term) => {
        const headers = {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
        };
        const searchUrl = `${BASE_URL}/api/contacts?search=${term}`;

        try {
            const response = await fetch(searchUrl, { method: "GET", headers });
            if (!response.ok) {
                throw new Error("Failed to fetch contacts");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createContact: async (authToken, formData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.post(
                `${BASE_URL}/api/contacts/create`,
                formData,
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

    updateContactByID: async (authToken, contactID, formData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.put(
                `${BASE_URL}/api/contacts/${contactID}`,
                formData,
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

    deleteContactByID: async (authToken, contactID) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.delete(
                `${BASE_URL}/api/contacts/${contactID}`,
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

export default contactsAPI;
