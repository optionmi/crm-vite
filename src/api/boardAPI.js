const BASE_URL = "http://localhost:8000";

const boardsAPI = {
    getAllBoard: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/boards/all`, {
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

    createBoard: async (boardData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/boards/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: boardData.name,
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default boardsAPI;
