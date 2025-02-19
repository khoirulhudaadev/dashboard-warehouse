import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLogin, User } from '../../types/auth';

const initialState: UserLogin = {
	auth: null,
	token: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		storeUser: (state: any, action: PayloadAction<User>) => {
			state.auth = action.payload;
		},
		storeToken: (state: any, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		clearUser: (state: any) => {
			state.auth = null;
			state.token = '';
		},
	}
})

export const { storeUser, storeToken, clearUser } = authSlice.actions;
export default authSlice.reducer;


