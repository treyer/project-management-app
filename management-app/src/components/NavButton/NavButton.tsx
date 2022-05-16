import React, { useState } from 'react';
import { Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

type TType = {
  title: string;
};

const Item = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '400',
});

function NavButton({ title }: TType) {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <Item
      onMouseOver={() => setMouseOver(true)}
      onFocus={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      onBlur={() => setMouseOver(false)}
      style={
        mouseOver
          ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
          : { backgroundColor: 'rgba(0, 0, 0, 0.3)' }
      }
    >
      {title}
    </Item>
  );
}

export default NavButton;
