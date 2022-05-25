/* eslint-disable no-console */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ROUTES } from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { darkTheme, lightTheme } from './themes/theme';
import { useAppSelector } from './store';

import './App.css';

function App() {
  const theme = useAppSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            {ROUTES.map((el) => (
              <Route key={el.id} path={el.routePath} element={el.element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
