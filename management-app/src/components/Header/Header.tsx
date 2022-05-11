import { Button } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../auth/authSlice';
import { ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import { RouteID } from '../../types';
import './Header.css';

function Header() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <header className="App-header">
      <nav className="nav-links">
        {isLoggedIn
          ? ROUTES.filter((el) => el.isShownWhenLoggedIn).map((el) => (
              <NavLink key={el.id} to={el.routePath}>
                {el.title}
              </NavLink>
            ))
          : ROUTES.filter(
              (el) => !el.isShownWhenLoggedIn && el.id !== RouteID.NotFound
            ).map((el) => (
              <NavLink key={el.id} to={el.routePath}>
                {el.title}
              </NavLink>
            ))}
        {isLoggedIn && <Button onClick={handleLogOut}>Log out</Button>}
      </nav>
    </header>
  );
}

export default Header;
