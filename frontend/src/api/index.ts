import axios from 'axios.ts';

// Get the API URL from environment variables, default to backend URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,  // Match the backend API router prefix;
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout;
});

// Request interceptor for auth tokens;
api.interceptors.request.use(config => {

  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling;
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
