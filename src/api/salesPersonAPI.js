import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const salespersonAPI = {
  getAllSalespersons: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/salespersons`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createSalesperson: async (salespersonData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/salespersons/create`,
        salespersonData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSalesperson: async (salespersonId, updatedSalespersonData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/salespersons/${salespersonId}`,
        updatedSalespersonData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteSalesperson: async (salespersonId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/salespersons/${salespersonId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default salespersonAPI;
