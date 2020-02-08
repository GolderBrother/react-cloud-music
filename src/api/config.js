import axios from 'axios';
const base_URL = 'http://xxx';

const axiosInstance = axios.create({
    baseURL: base_URL
});

axiosInstance.interceptors.request.use(config => config, error => Promise.reject(error));

axiosInstance.interceptors.response.use(res => res, error => Promise.reject(error));

export {
    axiosInstance
}