import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
	users: [],
    detailUser: {} 
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		storeUsers: (state: any, action: PayloadAction<any>) => {
			state.users = action.payload;
		},
        storeUser: (state: any, action: PayloadAction<any>) => {
            state.detailUser = action.payload
        },
		clearUsers: (state: any) => {
			state.users = [];
			state.detailUser = {}
		},
	}
})

export const { storeUsers, storeUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;
