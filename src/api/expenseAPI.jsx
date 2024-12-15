const expenseAPI = {
	getAllExpense: async (authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/travelling-expense/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			let data = await response.json();
			return data.expenses;
		} catch (error) {
			throw error;
		}
	},

	createExpense: async (expenseData, authToken) => {
		try {
			let response = await fetch(
				`${import.meta.env.VITE_APP_BASEURL}/api/travelling-expense`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						expense_description: expenseData.expense_description,
						amount: parseInt(expenseData.amount),
						id: expenseData.id,
					}),
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default expenseAPI;
