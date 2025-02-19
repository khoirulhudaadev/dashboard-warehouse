import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, ItemType } from '../../types/item';

const initialState: Item = {
	items: [],
    detailItem: null
};

const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		storeItems: (state: any, action: PayloadAction<Item>) => {
			state.items = action.payload;
		},
        storeItem: (state: any, action: PayloadAction<ItemType>) => {
            state.detailItem = action.payload
        },
		clearItems: (state: any) => {
			state.items = [];
            state.detailItem = null
		},
	}
})

export default itemSlice.reducer;
export const { storeItems, storeItem, clearItems } = itemSlice.actions;