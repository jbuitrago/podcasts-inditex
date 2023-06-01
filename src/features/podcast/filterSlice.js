import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: { filter: '', filterPodcasts: [] },
};

/**
 * @description : Este reducer de redux me permite guardar el estado del filtro de busqueda, el texto y el json resultado
 */

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		saveFilterInfo: (state, action) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { saveFilterInfo } = filterSlice.actions;

export default filterSlice.reducer;
