import axios from "axios";

const quotesAPI = {
	createOrganization: async (authToken, quoteData) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.post(
				`${import.meta.env.VITE_APP_BASEURL}/api/organizations/create`,
				quoteData,
				config
			);
			const data = {
				...res.data,
				resType: res.status === 201 ? "success" : "danger",
			};

			return data;
		} catch (error) {
			return {
				resType: "danger",
				message: error.message,
			};
		}
	},

	getAllOrganizations: async (authToken) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/organizations/all`,
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

	deleteOrganizationByID: async (organizationID, authToken) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.delete(
				`${
					import.meta.env.VITE_APP_BASEURL
				}/api/organizations/${organizationID}`,
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

	getOrganizationById: async (authToken, organizationID) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${
					import.meta.env.VITE_APP_BASEURL
				}/api/organizations/${organizationID}`,
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

	updateOrganizationByID: async (authToken, organizationID, quoteData) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.put(
				`${
					import.meta.env.VITE_APP_BASEURL
				}/api/organizations/${organizationID}`,
				quoteData,
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

	getOrganizationByName: async (authToken, term) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};
			const res = await axios.get(
				`${import.meta.env.VITE_APP_BASEURL}/api/organizations?search=${term}`,
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

export default quotesAPI;
