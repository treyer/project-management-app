/* eslint-disable no-console */
import React, { useEffect } from 'react';
import boardsAPI from './api/boardsAPI';
import { TBoard, TUser, TUserBase } from './api/types';
import userAPI from './api/usersAPI';

import './App.css';

const userId = 'de4e23bf-f372-4176-89d8-9bb9c240b5c3';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZTRlMjNiZi1mMzcyLTQxNzYtODlkOC05YmI5YzI0MGI1YzMiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE5MjM5NTl9.zoCBaZmGrQq2bC4GdrjG0g0VcJQAYXSIHjN0AEdIe_Q';
const body = {
  name: 'Vasya',
  login: 'user001',
  password: 'userpass@123',
};

const base = {
  login: 'user001',
  password: 'userpass@123',
};

const title = {
  title: 'New board',
};

const boardId = 'cf750520-22ed-4663-ac0c-599701d9ee2d';

function App() {
  /*  useEffect(() => {
    userAPI.updateUser(userId, token, body, (data: TUser) =>
      console.log('updateUser: ', data)
    );
  }, []);

  useEffect(() => {
    userAPI.getUser(userId, token, (data: TUser) =>
      console.log('getUser: ', data)
    );
  }, []);

  useEffect(() => {
    userAPI.getUsers(token, (data: TUser[]) => console.log('getUsers: ', data));
  }, []);

  /*  useEffect(() => {
    userAPI.createToken(base, (data: TUserBase) =>
      console.log('createToken: ', data)
    );
  }, []);  */

  /*  useEffect(() => {
    userAPI.createAccount(body, (data: TUser) =>
      console.log('createAccount: ', data)
    );
  }, []);  */

  /*  useEffect(() => {
    boardsAPI.createBoard(title, token, (data: TBoard) =>
      console.log('createBoard: ', data)
    );
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
