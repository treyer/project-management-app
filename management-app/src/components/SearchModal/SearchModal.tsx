import React from 'react';
import { Card, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { experimentalStyled as styled } from '@mui/material/styles';

type TProps = {
  display: boolean;
  close: () => void;
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

function SearchModal({ display, close }: TProps) {
  return (
    <Card
      sx={{
        position: 'absolute',
        top: `${display ? '55px' : '-500px'}`,
        backgroundColor: '#ffffff',
        padding: '5px 14px 0 5px',
        minWidth: '90px',
        zIndex: '100',
        transition: 'top 1s ease-in-out',
      }}
    >
      <StyledCloseIcon onClick={close} sx={{ fontSize: 15 }} />
      <Typography>sdsdf</Typography>
    </Card>
  );
}

export default SearchModal;
