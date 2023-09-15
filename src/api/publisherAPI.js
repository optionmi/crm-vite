import axios from 'axios';


const BASE_URL = 'http://localhost:8000'; // Replace with your backend API URL

const publishersApi = {
  // Create a new publisher
  createPublisher: async (e,authToken) => {
    try {
      let response = await fetch(`${BASE_URL}/api/publisher/`, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'token': authToken
        },
        body:JSON.stringify({'company_name':e.target.company_name.value, 'email':e.target.email.value, 'password':e.target.password.value})
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all publishers
  getAllPublishers: async (authToken) => {
    try {
      let response = await fetch(`${BASE_URL}/api/publisher/all`, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'authorization': authToken
        },
      })
      let data = await response.json()
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific publisher by ID
  getPublisherById: async (publisherId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/publishers/info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default publishersApi;
