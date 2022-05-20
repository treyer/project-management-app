import React from 'react';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { experimentalStyled as styled } from '@mui/material/styles';
import { ROUTES } from '../../routes';
import { RouteID } from '../../types';
import Logo from '../Logo/Logo';
import style from './Header.module.css';
import NavButton from '../NavButton/NavButton';
import SearchBar from '../SearchBar/SearchBar';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import UserMenu from '../UserMenu/UserMenu';
import { useAppSelector } from '../../store';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Link = styled(NavLink)({
  textDecoration: 'none',
});

function Header() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

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
              <Link
                key={ROUTES[RouteID.Welcome].id}
                to={ROUTES[RouteID.Welcome].routePath}
              >
                <Logo />
              </Link>
            </Grid>

            {isLoggedIn && (
              <Grid item>
                <Link
                  key={ROUTES[RouteID.Main].id}
                  to={ROUTES[RouteID.Main].routePath}
                >
                  <NavButton title={ROUTES[RouteID.Main].title} />
                </Link>
              </Grid>
            )}

            {isLoggedIn && (
              <Grid item>
                <NavButton title="add Board" startIcon={<AddIcon />} />
              </Grid>
            )}

            <Grid item style={{ position: 'relative' }}>
              <BurgerMenu />
            </Grid>
          </Grid>

          <Grid
            container
            item
            alignItems="center"
            spacing={1}
            style={{ width: 'auto' }}
          >
            <Grid item>
              <SearchBar />
            </Grid>
            <Grid item>
              <ThemeSwitch />
            </Grid>
            <Grid item>
              <LanguageSwitch />
            </Grid>
            <Grid item style={{ position: 'relative' }}>
              <UserMenu />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}

export default Header;
