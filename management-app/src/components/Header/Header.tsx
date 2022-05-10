import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="App-header">
      <nav className="nav-links">
        <NavLink to="/">Welcome</NavLink>
        <NavLink to="/main">Main</NavLink>
        <NavLink to="/board">Board</NavLink>
        <NavLink to="/auth">Auth</NavLink>
      </nav>
    </header>
  );
}

export default Header;
