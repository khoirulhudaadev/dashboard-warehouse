import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, RoleType } from '../../types/role';

const initialState: Role = {
	roles: [],
    detailRole: null
};

const roleSlice = createSlice({
	name: 'role',
	initialState,
	reducers: {
		storeRoles: (state: any, action: PayloadAction<Role>) => {
			state.roles = action.payload;
		},
        storeRole: (state: any, action: PayloadAction<RoleType>) => {
            state.detailRole = action.payload
        },
		clearRoles: (state: any) => {
			state.roles = [];
            state.detailRole = null
		},
	}
})

export const { storeRoles, storeRole, clearRoles } = roleSlice.actions;
export default roleSlice.reducer;
