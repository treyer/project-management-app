import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';

type TProps = {
  display: boolean;
  close: () => void;
};

const Item = styled('div')({
  position: 'fixed',
  top: '0',
  right: '0',
  backgroundColor: '#000000',
  opacity: '0.3',
  width: '100%',
  height: '100vh',
  zIndex: '10',
});

function BackLayer({ display, close }: TProps) {
  return (
    <Item
      onClick={close}
      style={{ display: `${display ? 'block' : 'none'}` }}
    />
  );
}

export default BackLayer;
