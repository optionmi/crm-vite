const BASE_URL = "http://localhost:8000";

const subjectAPI = {
    getAllSubject: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/subjects/all`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            let data = await response.json();
            return data.Subjects;
        } catch (error) {
            throw error;
        }
    },

    createSubject: async (subjectData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/subjects/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: subjectData.name,
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateSubjectByID: async (subjectID, subjectData, authToken) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/subjects/${subjectID}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: subjectData.name,
                    }),
                }
            );
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

    getSubjectByID: async (subjectID, authToken) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/subjects/${subjectID}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
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

    deleteSubjectByID: async (subjectID, authToken) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/subjects/${subjectID}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
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

export default subjectAPI;
