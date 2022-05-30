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
    secondary: {
      light: '#61c9ff',
      main: '#033756',
      contrastText: '#ffffff',
    },
    text: {
      secondary: '#000000',
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
    secondary: {
      light: '#C0C0C0',
      main: '#4d4f55',
      contrastText: '#ffffff',
    },
    text: {
      secondary: '#61dafb',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#61dafb',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#8796a5',
          borderColor: '#61dafb',
          '& input': {
            color: '#000000',
          },
          '& label': {
            color: '#000000',
          },
          '& P': {
            backgroundColor: '#8796a5',
            marginRight: 0,
            marginLeft: 0,
            paddingRight: 14,
            paddingLeft: 14,
          },
          '& .Mui-error': {
            color: '#f04408',
          },
        },
      },
    },
  },
});
