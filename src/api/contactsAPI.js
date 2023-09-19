import axios from "axios";

const BASE_URL = "http://localhost:8000";

const contactsAPI = {
    getAllContacts: async (authToken) => {
        try {
            const url = `${BASE_URL}/api/contacts/all`;
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

    getContactById: async (contactId) => {
        const url = `${BASE_URL}/api/contacts/${contactId}`;
        const { data } = await fetch(url);
        return data;
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

    createContact: async (contactData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/contacts/create`,
                contactData
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateContact: async (contactId, contactData) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/contacts/${contactId}`,
                contactData
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteContact: async (contactId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/api/contacts/${contactId}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default contactsAPI;
