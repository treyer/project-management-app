import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

type TType = {
  title: string;
  onClick?: () => void;
  startIcon?: ReactNode;
  isMarginBottom?: boolean;
  isActive?: boolean;
};

const Item = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '400',
});

function NavButton({
  title,
  onClick,
  startIcon,
  isMarginBottom,
  isActive,
}: TType) {
  return (
    <Item
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        boxSizing: 'border-box',
        marginBottom: isMarginBottom ? '5px' : 'auto',
        backgroundColor: isActive ? 'secondary.main' : 'primary.dark',
        color: isActive ? 'secondary.contrastText' : 'primary.contrastText',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      {title}
    </Item>
  );
}

NavButton.defaultProps = {
  onClick: () => false,
  startIcon: null,
  isMarginBottom: false,
  isActive: false,
};

export default NavButton;
