import axios from 'axios';
const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use(config => {

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;
