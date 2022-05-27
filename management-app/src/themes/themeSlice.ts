import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
  }
  return false;
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkTheme: getInitialTheme(),
  },
  reducers: {
    changeTheme: (state) => {
      state.darkTheme = !state.darkTheme;
      const theme = state.darkTheme ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
