import axios from "axios";

const BASE_URL = "http://localhost:8000";

const leadsAPI = {
    getAllLeads: async (authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/leads`, {
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

    getLeadById: async (leadId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/leads/${leadId}`);
            return response.data;
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

    updateLead: async (leadId, leadData) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/leads/${leadId}`,
                leadData
            );
            return response.data;
        } catch (error) {
            throw error;
        }
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
};

export default leadsAPI;
