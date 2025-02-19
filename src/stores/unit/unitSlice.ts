import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Unit, UnitType } from '../../types/unit';

const initialState: Unit = {
	units: [],
    detailUnit: null
};

const unitSlice = createSlice({
	name: 'unit',
	initialState,
	reducers: {
		storeUnits: (state: any, action: PayloadAction<Unit>) => {
			state.units = action.payload;
		},
        storeUnit: (state: any, action: PayloadAction<UnitType>) => {
            state.detailUnit = action.payload
        },
		clearUnits: (state: any) => {
			state.units = [];
            state.detailUnit = null
		},
	}
})

export default unitSlice.reducer;
export const { storeUnits, storeUnit, clearUnits } = unitSlice.actions;
