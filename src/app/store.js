import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/podcast/loadingSlice';
import filterReducer from '../features/podcast/filterSlice';

export const store = configureStore({
	reducer: {
		loading: loadingReducer,
		filter: filterReducer,
	},
});
