import axios from "axios";

const BASE_URL = "http://localhost:8000";

const leadsAPI = {
    getAllLeads: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/leads/all`, {
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

    getLeadById: async (authToken, leadId) => {
        try {
            let response = await fetch(`${BASE_URL}/api/leads/${leadId}`, {
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

    createLead: async (authToken, leadData) => {
        const response = await fetch(`${BASE_URL}/api/leads/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        });
        if (response.status !== 201) {
            return false;
        }
        const data = await response.json();
        return data;
    },

    deleteLead: async (leadId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/api/leads/${leadId}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addNote: async (authToken, leadId, note) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/leads/add-note/${leadId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ note }),
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

    addActivity: async (authToken, leadId, activity) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/leads/add-activity/${leadId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(activity),
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

    addFile: async (authToken, leadId, fileData) => {
        const formData = new FormData();
        formData.append("file", fileData.file);
        formData.append("name", fileData.name);
        formData.append("description", fileData.description);

        try {
            const response = await fetch(
                `${BASE_URL}/api/leads/add-file/${leadId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: formData,
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

    dailyPlanning: async (authToken, leadId, visitData) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/leads/add-visit/${leadId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        visit_date: visitData.visit_date,
                        visit_location: visitData.visit_location,
                        notes: visitData.notes,
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

    getAllVisit: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/leads/all/visit`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            let data = await response.json();
            return data.visit;
        } catch (error) {
            throw error;
        }
    },

    updateStage: async (authToken, leadId, updateData) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/leads/update-stage/${leadId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateData),
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

    updateLead: async (authToken, leadId, lead) => {
        try {
            const response = await fetch(`${BASE_URL}/api/leads/${leadId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(lead),
            });

            // Check if the response was successful
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
    getLeadByName: async (authToken, term) => {
        const headers = {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
        };
        const searchUrl = `${BASE_URL}/api/leads?search=${term}`;

        try {
            const response = await fetch(searchUrl, { method: "GET", headers });
            if (!response.ok) {
                throw new Error("Failed to fetch leads");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default leadsAPI;
