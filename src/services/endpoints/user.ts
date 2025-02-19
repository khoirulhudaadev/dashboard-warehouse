import { authType } from '../../types/auth';
import api from '../axios';

/*
 * Endpoints
 */
export const userRoute = {
	getAllUser: () => api.get(`/user`),
	getById: (id: string) => api.post(`/user/${id}`),
	addUser: (body: authType) => api.post(`/user`, body),
	updateUser: (id: string, body: any) => api.post(`/user/${id}`, body),
	deleteUser: (id: string) => api.delete(`/user/${id}`),
};
