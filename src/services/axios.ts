import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import store from '../stores/store';
import { base_url } from './urls';

// Define an interfaces
interface ErrorResponseData {
	message?: string;
	status?: number | undefined
}

const api = axios.create({
	baseURL: base_url,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	async function (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
		const token = store.getState()?.auth?.token;

		// Initialize headers if undefined
		if (!config.headers) {
			config.headers = {};
		}
		
		// Ensure headers is an object before modifying it
		if (config.headers) {
			if (token) {

				if(token === undefined || token === null) {
					window.location.href = '/login'
				}

				(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
			} 
			if (config.data instanceof FormData) {
				(config.headers as Record<string, string>)['Content-Type'] = 'multipart/form-data';
			}
		}

		return config as InternalAxiosRequestConfig;
	},
	function (error: AxiosError): Promise<never> {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	function (response: AxiosResponse): AxiosResponse {
		return response;
	},
	function (error: AxiosError<ErrorResponseData>): Promise<never> {
		console.log('error:', error)
		if (error?.message === "Request failed with status code 401" || [401, 402].includes(error?.status ?? 0)) {
			window.location.pathname = '/';
		} 

		return Promise.reject(error);
	}
);

export default api;
