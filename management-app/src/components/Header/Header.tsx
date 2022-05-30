import React, { useCallback } from 'react';
import { Box, Grid } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { experimentalStyled as styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../routes';
import { RouteID } from '../../types';
import Logo from '../Logo/Logo';
import NavButton from '../NavButton/NavButton';
import SearchBar from '../SearchBar/SearchBar';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import UserMenu from '../UserMenu/UserMenu';
import { useAppDispatch, useAppSelector } from '../../store';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { openBoardModal } from '../../pages/MainPage/slice/mainSlice';

const Link = styled(NavLink)({
  textDecoration: 'none',
});

const StyledGrid = styled(Grid)({
  position: 'relative',
});

function Header() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleOpenBoardModal = useCallback(() => {
    navigate(`/main`);
    dispatch(openBoardModal());
  }, [dispatch, navigate]);

  const matches = useMediaQuery('(max-width:900px)');
  const matches1 = useMediaQuery('(max-width:470px)');
  const matches2 = useMediaQuery('(max-width:430px)');

  return (
    <header>
      <Box sx={{ backgroundColor: 'primary.main' }}>
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
          <StyledGrid
            container
            justifyContent={matches1 ? 'center' : 'space-between'}
            alignItems="center"
            spacing={1}
            sx={{ display: 'flex', minHeight: 44 }}
          >
            <StyledGrid
              container
              item
              alignItems="center"
              flexDirection={matches2 ? 'row-reverse' : 'row'}
              spacing={1}
              style={{ width: 'auto' }}
            >
              <StyledGrid item>
                <Link
                  key={ROUTES[RouteID.Welcome].id}
                  to={ROUTES[RouteID.Welcome].routePath}
                  // eslint-disable-next-line react/no-children-prop
                  children={({ isActive }) => {
                    return <Logo isActive={isActive} />;
                  }}
                />
              </StyledGrid>

              {isLoggedIn && !matches && (
                <StyledGrid item>
                  <Link
                    key={ROUTES[RouteID.Main].id}
                    to={ROUTES[RouteID.Main].routePath}
                    // eslint-disable-next-line react/no-children-prop
                    children={({ isActive }) => {
                      return (
                        <NavButton
                          title={t(`header.${ROUTES[RouteID.Main].title}`)}
                          isActive={isActive}
                        />
                      );
                    }}
                  />
                </StyledGrid>
              )}

              {isLoggedIn && !matches && (
                <StyledGrid item>
                  <NavButton
                    title={t('header.addBoard')}
                    startIcon={<AddIcon />}
                    onClick={handleOpenBoardModal}
                  />
                </StyledGrid>
              )}

              {isLoggedIn && matches && (
                <StyledGrid item>
                  <BurgerMenu />
                </StyledGrid>
              )}
            </StyledGrid>

            <StyledGrid
              container
              item
              alignItems="center"
              justifyContent={matches1 ? 'center' : 'space-between'}
              spacing={1}
              style={{ width: 'auto' }}
            >
              <StyledGrid item>
                <SearchBar />
              </StyledGrid>

              <StyledGrid
                container
                item
                alignItems="center"
                spacing={1}
                style={{ width: 'auto' }}
              >
                <StyledGrid item>
                  <ThemeSwitch />
                </StyledGrid>
                <StyledGrid item>
                  <LanguageSwitch />
                </StyledGrid>
                <StyledGrid item>
                  <UserMenu />
                </StyledGrid>
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
