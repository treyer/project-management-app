/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { TUser, TUserBase } from './api/types';
import userAPI from './api/usersAPI';

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
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
