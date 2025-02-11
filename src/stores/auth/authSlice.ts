import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	auth: {},
	token: '',
	authDirect: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		storeUser: (state: any, action: PayloadAction<any>) => {
			state.auth = action.payload;
		},
		storeToken: (state: any, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		clearUser: (state: any) => {
			state.auth = {};
			state.token = '';
		},
	}
})

export const { storeUser, storeToken, storeAuthDirect, clearUser } = authSlice.actions;
export default authSlice.reducer;