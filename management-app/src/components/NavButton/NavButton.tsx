import React, { ReactNode, useState } from 'react';
import { Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

type TType = {
  title: string;
  onClick?: () => void;
  startIcon?: ReactNode;
  isMarginBottom?: boolean;
};

const Item = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '400',
});

function NavButton({ title, onClick, startIcon, isMarginBottom }: TType) {
  const [mouseOver, setMouseOver] = useState(false);

  let style;
  if (mouseOver && isMarginBottom)
    style = { backgroundColor: '#3588b9', marginBottom: '5px' };
  if (mouseOver && !isMarginBottom) {
    style = { backgroundColor: '#3588b9' };
  }
  if (!mouseOver && isMarginBottom)
    style = { backgroundColor: '#02507f', marginBottom: '5px' };
  if (!mouseOver && !isMarginBottom) {
    style = { backgroundColor: '#02507f' };
  }

  return (
    <Item
      onMouseOver={() => setMouseOver(true)}
      onFocus={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      onBlur={() => setMouseOver(false)}
      onClick={onClick}
      style={style}
      startIcon={startIcon}
    >
      {title}
    </Item>
  );
}

NavButton.defaultProps = {
  onClick: () => false,
  startIcon: null,
  isMarginBottom: false,
};

export default NavButton;
