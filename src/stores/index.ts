import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth/authSlice.tsx';

export const rootReducer = combineReducers({
	auth,
	// ...Reducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
