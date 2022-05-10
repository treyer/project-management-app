import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import './Header.css';

function Header() {
  return (
    <header className="App-header">
      <nav className="nav-links">
        {ROUTES.map((el) => {
          if (el.id !== 5) {
            return (
              <NavLink key={el.id} to={el.routePath}>
                {el.title}
              </NavLink>
            );
          }
          return '';
        })}
      </nav>
    </header>
  );
}

export default Header;
