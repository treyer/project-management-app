/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { TUser } from './api/types';
import userAPI from './api/userAPI';

import './App.css';

const userId = 'de4e23bf-f372-4176-89d8-9bb9c240b5c3';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZTRlMjNiZi1mMzcyLTQxNzYtODlkOC05YmI5YzI0MGI1YzMiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE4NjMxOTR9.jsO8JlG3YE9gRI8BEAJJtT-8RlTf6KjNZ66DV0Lk27g';
const body = {
  name: 'Vasya',
  login: 'user001',
  password: 'userpass@123',
};

function App() {
  useEffect(() => {
    userAPI.updateUser(userId, token, body, (data: TUser) =>
      console.log('updateUser: ', data)
    );
  }, []);

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
