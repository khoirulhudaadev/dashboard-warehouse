import { TypeType } from '../../types/type';
import api from '../axios';

/*
 * Endpoints
 */
export const typeRoute = {
	getAllType: () => api.get(`/type`),
	getById: (id: string) => api.post(`/type/${id}`),
	addType: (body: TypeType) => api.post(`/type`, body),
	updateType: (id: string, body: any) => api.post(`/type/${id}`, body),
	deleteType: (id: string) => api.delete(`/type/${id}`),
};
