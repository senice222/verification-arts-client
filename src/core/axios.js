import axios from "axios";
export const url = 'http://localhost:4000/api';
const $api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

$api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const fetcher = async (url, init = {}) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...init.headers
        };

        const response = await fetch(url, { ...init, headers });
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error('An error occurred while fetching the data.');
            error.info = errorData;
            error.status = response.status;
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default $api