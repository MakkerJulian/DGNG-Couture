import axios, { AxiosInstance } from 'axios';
import { JwtPayload } from 'jwt-decode';


export type Token = JwtPayload & {
    email: string;
    role: string;
    appId: string;
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://${import.meta.env.VITE_APP_URL ?? "localhost"}:3002`,
    timeout: 5000,
    proxy: false
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem("token");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, error => Promise.reject(error));

const IWAAxiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 50000,
    proxy: false
});

export { axiosInstance, IWAAxiosInstance };


