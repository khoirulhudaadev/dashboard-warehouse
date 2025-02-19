import { authType } from '../../types/auth';
import api from '../axios';

/*
 * Endpoints
 */
export const auth = {
	login: (body: authType) => api.post(`/login`, body),
	register: (body: any) => api.post(`/register`, body),
	forgotPassword: (body: any) => api.post(`/forgot-password`, body),
	resetPassword: (body: any) => api.post(`/reset-password`, body),
};
