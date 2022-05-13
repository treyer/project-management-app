/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';
import { ROUTES } from './constants';
import { useAppSelector } from './store';

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn]);

  return (
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
  );
}

export default App;
