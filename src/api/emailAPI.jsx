import axios from "axios";

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
				`${import.meta.env.VITE_APP_BASEURL}/api/emails/send-email`,
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
				`${import.meta.env.VITE_APP_BASEURL}/api/emails/email-notifications`,
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

	getEmailByID: async (authToken, emailID) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/emails/get-email/${emailID}`,
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

	getAllEmails: async (authToken) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/emails/all`,
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

	getSentEmails: async (authToken) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/emails/sent-emails`,
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

	deleteEmailById: async (authToken, emailID) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.delete(
				`${import.meta.env.VITE_APP_BASEURL}/api/emails/${emailID}`,
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
