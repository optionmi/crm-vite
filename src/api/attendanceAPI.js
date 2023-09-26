const BASE_URL = "http://localhost:8000";

const attendanceAPI = {
    createAttendance: async (attendanceData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/attendance`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: attendanceData.id,
                    is_present: attendanceData.is_present,
                }),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAttendance: async (authToken, id) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/attendance/salespersons/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await response.json();
            return data.attendance;
        } catch (error) {
            throw error;
        }
    },
};

export default attendanceAPI;
