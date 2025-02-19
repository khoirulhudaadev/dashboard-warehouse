import api from '../axios';

/*
 * Endpoints
 */
export const itemRoute = {
	getAllItem: () => api.get(`/item`),
	getById: (id: string) => api.post(`/item/${id}`),
	addItem: (body: FormData) => api.post(`/item`, body),
	updateItem: (id: string, body: any) => api.post(`/item/${id}`, body),
	updateAmountItem: (id: string, body: any) => api.post(`/item/out/${id}`, body),
	deleteItem: (id: string) => api.delete(`/item/${id}`),
};
