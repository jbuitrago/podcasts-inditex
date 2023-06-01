import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: true,
};

/**
 * @description : Este reducer de redux me permite guardar el estado del loading circular del header
 */
export const loadingSlice = createSlice({
	name: 'loadingGlobal',
	initialState,
	reducers: {
		activate: state => {
			state.value = true;
		},
		deactivate: state => {
			state.value = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { activate, deactivate } = loadingSlice.actions;

export default loadingSlice.reducer;
