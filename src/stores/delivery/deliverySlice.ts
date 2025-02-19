import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Delivery, DeliveryType } from '../../types/delivery';

const initialState: Delivery = {
	deliveries: [],
    detailDelivery: null
};

const deliverySlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		storeDeliveries: (state: any, action: PayloadAction<Delivery>) => {
			state.deliveries = action.payload;
		},
        storeDelivery: (state: any, action: PayloadAction<DeliveryType>) => {
            state.detailDelivery = action.payload
        },
		clearDeliveries: (state: any) => {
			state.deliveries = [];
            state.detailDelivery = null
		},
	}
})

export const { storeDeliveries, storeDelivery, clearDeliveries } = deliverySlice.actions;
export default deliverySlice.reducer;