import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { REGISTER, PERSIST, REHYDRATE } from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';
import { rootReducer, RootState } from './index'

const encryptor = encryptTransform({
    secretKey: 'Super-Secret-key-jrtec',
    onError: function (error: any) {
		console.error(error);
      // Handle the error.
    },
})

const persistConfig = {
	key: 'root',
	storage,
	transforms: [encryptor],
};

const persistedReducers = persistReducer<any>(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware: any) =>
	  getDefaultMiddleware({
		serializableCheck: {
		  ignoredActions: [PERSIST, REHYDRATE, REGISTER],
		},
	  }).concat(thunk),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	undefined,
	Action<string>
>;
export default store;