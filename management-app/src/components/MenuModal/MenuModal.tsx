import React from 'react';
import { ButtonGroup, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import NavButton from '../NavButton/NavButton';
import { MenuModalType, RouteID } from '../../types';
import { ROUTES } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../store';
import { logOut } from '../../auth/authSlice';

type TProps = {
  display: boolean;
  close: () => void;
  type: MenuModalType;
};

const StyledCloseIcon = styled(CloseIcon)({
  position: 'absolute',
  top: '0',
  right: '0',
  color: '#000000',
  backgroundColor: '#cccccc',
  cursor: 'pointer',
  '&:hover': {
    opacity: '0.8',
  },
});

function MenuModal({ display, close, type }: TProps) {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        position: 'absolute',
        right: `${type === MenuModalType.User ? '5px' : 'auto'}`,
        left: `${type === MenuModalType.Menu ? '5px' : 'auto'}`,
        top: `${display ? '55px' : '-500px'}`,
        backgroundColor: '#ffffff',
        padding: '5px 14px 0 5px',
        minWidth: '90px',
        zIndex: '100',
        transition: 'top 1s ease-in-out',
      }}
    >
      <StyledCloseIcon onClick={close} sx={{ fontSize: 15 }} />
      {type === MenuModalType.User && !isLoggedIn && (
        <ButtonGroup orientation="vertical">
          <NavButton
            title={ROUTES[RouteID.LogIn].title}
            onClick={() => {
              close();
              navigate(ROUTES[RouteID.LogIn].routePath);
            }}
            isMarginBottom
          />
          <NavButton
            title={ROUTES[RouteID.SignUp].title}
            onClick={() => {
              close();
              navigate(ROUTES[RouteID.SignUp].routePath);
            }}
            isMarginBottom
          />
        </ButtonGroup>
      )}
      {type === MenuModalType.User && isLoggedIn && (
        <ButtonGroup orientation="vertical">
          <NavButton
            title="Log out"
            onClick={() => {
              close();
              dispatch(logOut());
              navigate('/');
            }}
            isMarginBottom
          />
          <NavButton
            title={ROUTES[RouteID.EditProfile].title}
            onClick={() => {
              close();
              navigate(ROUTES[RouteID.EditProfile].routePath);
            }}
            isMarginBottom
          />
        </ButtonGroup>
      )}
      {type === MenuModalType.Menu && isLoggedIn && (
        <ButtonGroup orientation="vertical">
          <NavButton
            title={ROUTES[RouteID.Main].title}
            onClick={() => {
              close();
              navigate(ROUTES[RouteID.Main].routePath);
            }}
            isMarginBottom
          />
          <NavButton
            title="add Board"
            startIcon={<AddIcon />}
            onClick={() => {
              close();
              // navigate(ROUTES[RouteID.EditProfile].routePath);
            }}
            isMarginBottom
          />
        </ButtonGroup>
      )}
    </Card>
  );
}

export default MenuModal;
