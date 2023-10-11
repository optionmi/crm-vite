import axios from "axios";

const BASE_URL = "http://localhost:8000";

const emailAPI = {
    sendEmail: async (authToken, emailData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.post(
                `${BASE_URL}/api/emails/send-email`,
                emailData,
                config
            );
            const data = {
                ...res.data,
                resType: res.status === 200 ? "success" : "danger",
            };

            return data;
        } catch (error) {
            return {
                resType: "danger",
                message: error.message,
            };
        }
    },

    getEmailNotifications: async (authToken) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.get(
                `${BASE_URL}/api/emails/email-notifications`,
                config
            );
            const data = {
                ...res.data,
                resType: res.status === 200 ? "success" : "danger",
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

export default emailAPI;
