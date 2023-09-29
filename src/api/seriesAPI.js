const BASE_URL = "http://localhost:8000";

const seriesAPI = {
    getAllSeries: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/series/all`, {
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

    createSeries: async (seriesData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/series/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(seriesData),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateSeriesByID: async (seriesID, seriesData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/series/${seriesID}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: seriesData.name,
                }),
            });
            const data = {
                ...(await response.json()),
                resType: response.ok ? "success" : "danger",
            };

            return data;
        } catch (error) {
            return {
                resType: "danger",
                message: error.message,
            };
        }
    },

    getSeriesByID: async (seriesID, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/series/${seriesID}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            const data = {
                ...(await response.json()),
                resType: response.ok ? "success" : "danger",
            };

            return data;
        } catch (error) {
            return {
                resType: "danger",
                message: error.message,
            };
        }
    },

    deleteSeriesByID: async (seriesID, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/series/${seriesID}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            const data = {
                ...(await response.json()),
                resType: response.ok ? "success" : "danger",
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

export default seriesAPI;
