const BASE_URL = "http://localhost:8000";

const claimAPI = {
    getAllClaim: async (authToken) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/travelling-claims/all`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await response.json();
            return data.claims;
        } catch (error) {
            throw error;
        }
    },

    createClaim: async (claimData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/travelling-claims`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    claim_description: claimData.claim_description,
                    amount: parseInt(claimData.amount),
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default claimAPI;
