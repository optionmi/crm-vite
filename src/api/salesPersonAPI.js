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

    createSalesperson: async (salespersonData,authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/salesperson`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: salespersonData.name,
                    email: salespersonData.email,
                    phone_number: parseInt(salespersonData.phone_number),
                    team: salespersonData.team,
                    password:salespersonData.password,
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default salespersonAPI;
