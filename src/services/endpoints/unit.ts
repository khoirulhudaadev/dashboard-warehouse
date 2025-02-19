import { UnitType } from 'types/unit';
import api from '../axios';

/*
 * Endpoints
 */
export const unitRoute = {
	getAllUnit: () => api.get(`/unit`),
	getById: (id: string) => api.post(`/unit/${id}`),
	addUnit: (body: UnitType) => api.post(`/unit`, body),
	updateUnit: (id: string, body: any) => api.post(`/unit/${id}`, body),
	deleteUnit: (id: string) => api.delete(`/unit/${id}`),
};
