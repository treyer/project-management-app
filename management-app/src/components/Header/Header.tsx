import React from 'react';
import { Button, Grid } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../auth/authSlice';
import { ROUTES } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../store';
import { RouteID } from '../../types';
import Logo from '../Logo/Logo';
import style from './Header.module.css';
import NavButton from '../NavButton/NavButton';
import SearchBar from '../SearchBar/SearchBar';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

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
          spacing={1}
        >
          <Grid item>
            <NavLink
              key={ROUTES[RouteID.Welcome].id}
              to={ROUTES[RouteID.Welcome].routePath}
              style={{ textDecoration: 'none' }}
            >
              <Logo />
            </NavLink>
          </Grid>

          <Grid item>
            <nav className="nav-links">
              <Grid container spacing={1}>
                {ROUTES.filter(
                  (el) =>
                    el.isShownWhenLoggedIn === isLoggedIn &&
                    el.id !== RouteID.NotFound
                ).map((el) => (
                  <Grid item key={el.id}>
                    <NavLink
                      key={el.id}
                      to={el.routePath}
                      style={{ textDecoration: 'none' }}
                    >
                      <NavButton title={el.title} />
                    </NavLink>
                  </Grid>
                ))}
                {isLoggedIn && <Button onClick={handleLogOut}>Log out</Button>}
              </Grid>
            </nav>
          </Grid>

          <Grid item>
            <SearchBar />
          </Grid>
          <Grid item>
            <ThemeSwitch />
          </Grid>
        </Grid>
      </div>
    </header>
  );
}

export default Header;
