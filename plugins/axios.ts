// axiosInstance.js
import axios from 'axios';

const $axios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // Default content type
    Accept: 'application/json', // Default accept type
  },
});

// Add a request interceptor
$axios.interceptors.request.use(
  (config) => {
    // Modify or log requests before they are sent
    // Example: Add an Authorization header
    const token = 'your-auth-token'; // Replace with your token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
$axios.interceptors.response.use(
  (response) => {
    // Handle responses
    return response;
  },
  (error) => {
    // Handle response errors
    console.error('Axios Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default $axios;
