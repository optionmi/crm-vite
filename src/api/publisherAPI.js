import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your backend API URL

const publishersApi = {
  // Create a new publisher
  createPublisher: async (publisherData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/publishers/create`, publisherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all publishers
  getAllPublishers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/publishers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific publisher by ID
  getPublisherById: async (publisherId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/publishers/${publisherId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a publisher by ID with the given data
  updatePublisher: async (publisherId, publisherData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/publishers/${publisherId}`, publisherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a publisher by ID
  deletePublisher: async (publisherId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/publishers/${publisherId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default publishersApi;
