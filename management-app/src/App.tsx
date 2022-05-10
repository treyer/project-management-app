import React from 'react';
import { Provider } from 'react-redux';

import { SignUpForm } from './auth/SignUpForm';
import { store } from './store';

import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header" />
        <SignUpForm />
        <main className="main" />
      </Provider>
    </div>
  );
}

export default App;
