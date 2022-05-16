import React from 'react';
import { Button, Grid } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../auth/authSlice';
import { ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import { RouteID } from '../../types';
import Logo from '../Logo/Logo';
import style from './Header.module.css';

function Header() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          className={style.links}
        >
          <NavLink
            key={ROUTES[RouteID.Welcome].id}
            to={ROUTES[RouteID.Welcome].routePath}
            style={{ textDecoration: 'none' }}
          >
            <Logo />
          </NavLink>

          <nav className="nav-links">
            {ROUTES.filter(
              (el) =>
                el.isShownWhenLoggedIn === isLoggedIn &&
                el.id !== RouteID.NotFound
            ).map((el) => (
              <NavLink key={el.id} to={el.routePath}>
                {el.title}
              </NavLink>
            ))}
            {isLoggedIn && <Button onClick={handleLogOut}>Log out</Button>}
          </nav>
        </Grid>
      </div>
    </header>
  );
}

export default Header;
