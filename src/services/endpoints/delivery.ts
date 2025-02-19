import api from '../axios';

/*
 * Endpoints
 */
export const deliveryRoute = {
	getAllDelivery: () => api.get(`/delivery`),
	restoreDelivery: (id: string) => api.post(`/delivery/restore/${id}`),
	getById: (id: string) => api.delete(`/delivery/${id}`),
	deleteDelivery: (id: string) => api.delete(`/delivery/${id}`),
};
