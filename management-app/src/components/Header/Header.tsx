import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { RouteID } from '../../types';
import './Header.css';

function Header() {
  return (
    <header className="App-header">
      <nav className="nav-links">
        {ROUTES.filter(
          (el) => el.id !== RouteID.Board && el.id !== RouteID.NotFound
        ).map((el) => (
          <NavLink key={el.id} to={el.routePath}>
            {el.title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
