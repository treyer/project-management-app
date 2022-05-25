import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: 'white',
  },
  reducers: {
    changeTheme: (state) => {
      if (state.value === 'white') {
        state.value = 'black';
      } else {
        state.value = 'white';
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
