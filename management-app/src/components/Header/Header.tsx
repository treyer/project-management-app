import React from 'react';
import { Grid } from '@mui/material';
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
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

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
          justifyContent="space-between"
          alignItems="center"
          className={style.links}
          spacing={1}
        >
          <Grid
            container
            item
            alignItems="center"
            spacing={1}
            style={{ width: 'auto' }}
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
                <Grid container spacing={1} style={{ width: 'auto' }}>
                  {ROUTES.filter(
                    (el) =>
                      el.isShownWhenLoggedIn === isLoggedIn &&
                      el.id !== RouteID.NotFound &&
                      el.id !== RouteID.Welcome
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
                  {isLoggedIn && (
                    <Grid item>
                      <NavButton onClick={handleLogOut} title="Log out" />
                    </Grid>
                  )}
                </Grid>
              </nav>
            </Grid>
          </Grid>

          <Grid container item alignItems="center" style={{ width: 'auto' }}>
            <Grid item>
              <SearchBar />
            </Grid>
            <Grid item>
              <ThemeSwitch />
            </Grid>
            <Grid item>
              <LanguageSwitch />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}

export default Header;
