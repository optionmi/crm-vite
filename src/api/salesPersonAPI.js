import axios from "axios";

const BASE_URL = "http://localhost:8000";

const salespersonAPI = {
    getAllSalespersons: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/salesperson/all`, {
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

    createSalesperson: async (salespersonData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/salespersons/create`,
                salespersonData
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default salespersonAPI;
