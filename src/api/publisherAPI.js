import axios from "axios";

const BASE_URL = "http://localhost:8000"; // Replace with your backend API URL

const publishersApi = {
    // Create a new publisher
    createPublisher: async (publisherData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/publisher/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_name: publisherData.company_name,
                    email: publisherData.email,
                    country: publisherData.country,
                    state: publisherData.state,
                    city: publisherData.city,
                    address: publisherData.address,
                    contact_person:publisherData.contact_person,
                    postal_code: parseInt(publisherData.postal_code),
                    phone_number: parseInt(publisherData.phone_number),
                    password:publisherData.password,
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all publishers
    getAllPublishers: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/publisher/all`, {
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

    // Get a specific publisher by ID
    getPublisherById: async (publisherId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/publishers/info`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default publishersApi;
