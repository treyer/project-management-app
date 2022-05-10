/* eslint-disable no-console */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';
import { ROUTES } from './constants';

function App() {
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
