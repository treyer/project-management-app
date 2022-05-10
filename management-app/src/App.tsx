/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { TUser, TUserBase } from './api/types';
import userAPI from './api/usersAPI';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import BoardPage from './pages/BoardPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';

/*  const userId = 'e374d67e-365f-467c-8481-853a0895fff0';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZTRlMjNiZi1mMzcyLTQxNzYtODlkOC05YmI5YzI0MGI1YzMiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMjQ2MTl9.TnMC2aJjXAwvhnCM2bDs8dOGDFtvoU8aeMdZsfsc7qQ';
const user = {
  name: 'Vasya',
  login: 'user001',
  password: 'userpass@123',
};

const base = {
  login: 'user001',
  password: 'userpass@123',
};  */

function App() {
  /*  useEffect(() => {
    userAPI
      .updateUser(userId, token, user)
      .then((result) => console.log(result));
  }, []);

  useEffect(() => {
    userAPI
      .createAccount(user)
      .then((data) => console.log('createAccount: ', data));
  }, []);  */

  return (
    <div className="App">
      <header className="App-header" />
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
    </div>
  );
}

export default App;
