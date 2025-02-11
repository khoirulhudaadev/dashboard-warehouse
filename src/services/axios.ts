import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { base_url } from './urls';
import store from '../stores/store';

// const navigate = useNavigate()

// Define an interfaces
interface ErrorResponseData {
	message?: string;
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
		const responseData = error.response?.data;

		if (responseData?.message === 'Unauthenticated.') {
			window.location.pathname = '/login';
		} 

		return Promise.reject(error);
	}
);

export default api;
