const publishersApi = {
	// Create a new publisher
	createPublisher: async (publisherData, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/publishers/create`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						company_name: publisherData.company_name,
						email: publisherData.email,
						country: publisherData.country,
						state: publisherData.state,
						city: publisherData.city,
						address: publisherData.address,
						contact_person: publisherData.contact_person,
						postal_code: parseInt(publisherData.postal_code),
						phone_number: parseInt(publisherData.phone_number),
						password: publisherData.password,
					}),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Get all publishers
	getAllPublishers: async (authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/publishers/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			let data = await response.json();
			return data.publishers;
		} catch (error) {
			throw error;
		}
	},

	// Get a specific publisher by ID
	getPublisherById: async (authToken, id) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/publishers/${id}`,
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

	updatePublisher: async (publisher, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/publishers/${publisher.id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						company_name: publisher.company_name,
						email: publisher.email,
						country: publisher.country,
						state: publisher.state,
						city: publisher.city,
						address: publisher.address,
						contact_person: publisher.contact_person,
						postal_code: parseInt(publisher.postal_code),
						phone_number: parseInt(publisher.phone_number),
					}),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	deletePublisher: async (authToken, id) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/publishers/${id}`,
				{
					method: "DELETE",
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

export default publishersApi;
