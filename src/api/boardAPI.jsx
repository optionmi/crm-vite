const boardsAPI = {
	getAllBoard: async (authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/boards/all`,
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

	createBoard: async (boardData, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/boards/create`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: boardData.name,
					}),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getBoardByID: async (boardID, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/boards/${boardID}`,
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

	updateBoardByID: async (boardID, boardData, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/boards/${boardID}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: boardData.name,
					}),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	deleteBoardByID: async (boardID, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/boards/${boardID}`,
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

export default boardsAPI;
