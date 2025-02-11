import { authType } from '../../types/auth';
import api from '../axios';

/*
 * Endpoints
 */
export const auth = {
	login: (body: authType) => api.post(`/login`, body),
	register: (body: any) => api.post(`/register`, body),
};
