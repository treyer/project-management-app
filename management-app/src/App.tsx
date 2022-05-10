/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { TUser, TUserBase } from './api/types';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import BoardPage from './pages/BoardPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import userAPI from './api/usersAPI';

import { SignUpForm } from './auth/SignUpForm';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <NavLink to="/">Welcome</NavLink>
      <NavLink to="/main">Main</NavLink>
      <NavLink to="/board">Board</NavLink>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />

      <SignUpForm />
      <main className="main" />
    </div>
  );
}

export default App;
