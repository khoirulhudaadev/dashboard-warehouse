import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth/authSlice.ts';
import item from './item/itemSlice.ts';
import role from './role/roleSlice.ts';
import typeSlice from './type/typeSlice.ts';
import unit from './unit/unitSlice.ts';
import user from './user/userSlice.ts';
import delivery from './delivery/deliverySlice.ts';

export const rootReducer = combineReducers({
	auth,
	role,
	user,
	unit,
	type: typeSlice,
	item,
	delivery
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
