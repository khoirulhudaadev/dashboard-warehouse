import { RoleType } from '../../types/role';
import api from '../axios';

/*
 * Endpoints
 */
export const roleRoute = {
	getAllRoles: () => api.get(`/role`),
	getById: (id: string) => api.post(`/role/${id}`),
	addRole: (body: RoleType) => api.post(`/role`, body),
	updateRole: (id: string, body: any) => api.post(`/role/${id}`, body),
	deleteRole: (id: string) => api.delete(`/role/${id}`),
};
