/* eslint-disable no-console */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';
import { ROUTES } from './routes';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <main className="main">
          <Routes>
            {ROUTES.map((el) => (
              <Route key={el.id} path={el.routePath} element={el.element} />
            ))}
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
