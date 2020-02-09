import axios from 'axios';
const base_URL = 'http://localhost:4000';

const axiosInstance = axios.create({
    baseURL: base_URL
});

axiosInstance.interceptors.request.use(config => config, error => Promise.reject(error));

axiosInstance.interceptors.response.use(res => res.data, error => Promise.reject(error));

export {
    axiosInstance
}