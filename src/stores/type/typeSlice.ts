import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Type, TypeType } from '../../types/type';

const initialState: Type = {
	types: [],
    detailType: null
};

const typeSlice = createSlice({
	name: 'type',
	initialState,
	reducers: {
		storeTypes: (state: any, action: PayloadAction<Type>) => {
			state.types = action.payload;
		},
        storeType: (state: any, action: PayloadAction<TypeType>) => {
            state.detailType = action.payload
        },
		clearTypes: (state: any) => {
			state.types = [];
            state.detailType = null
		},
	}
})

export default typeSlice.reducer;
export const { storeTypes, storeType, clearTypes } = typeSlice.actions;
