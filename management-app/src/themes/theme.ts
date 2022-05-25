import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#3588b9',
      main: '#026aa7',
      dark: '#02507f',
      contrastText: '#ffffff',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#282c34',
      main: '#20232a',
      dark: '#16181d',
      contrastText: '#61dafb',
    },
  },
});
