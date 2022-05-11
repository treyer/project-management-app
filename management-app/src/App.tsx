import React from 'react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions
import { SignUpForm } from './auth/SignUpForm';
// eslint-disable-next-line import/extensions
import { SignInForm } from './auth/SignInForm';
import { store } from './store';

import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header" />
        <SignUpForm />
        <SignInForm />
        <main className="main" />
      </Provider>
    </div>
  );
}

export default App;
