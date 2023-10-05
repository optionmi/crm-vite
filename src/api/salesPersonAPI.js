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

    getSalespersonByName: async (authToken, term) => {
        try {
            const headers = {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            };
            const searchUrl = `${BASE_URL}/api/salesperson?search=${term}`;

            const response = await fetch(searchUrl, {
                method: "GET",
                headers: headers,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Salesperson");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getSalespersonByTeam: async (authToken) => {
        try {
            const headers = {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            };
            const searchUrl = `${BASE_URL}/api/salesperson/salespersons`;

            const response = await fetch(searchUrl, {
                method: "GET",
                headers: headers,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Salesperson");
            }

            const data = await response.json();
            return data.salespersons;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createSalesperson: async (salespersonData, authToken) => {
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
                    password: salespersonData.password,
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getSalespersonById: async (authToken, id) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/salesperson/salespersons/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },
};

export default salespersonAPI;
