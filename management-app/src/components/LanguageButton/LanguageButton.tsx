import React from 'react';
import { Button, useTheme } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

type TParam = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Btn = styled(Button)({
  '&:hover': {
    opacity: '0.8',
  },
  '&:disabled': {
    color: '#ffffff',
  },
});

function LanguageButton({ text, isActive, onClick }: TParam) {
  const theme = useTheme();

  return (
    <Btn
      size="small"
      sx={{
        backgroundColor: isActive
          ? 'rgba(0, 0, 0, 0.3)'
          : 'rgba(255, 255, 255, 0.2)',
        color:
          theme.palette.mode === 'dark' ? 'primary.contrastText' : '#ffffff',
      }}
      disabled={isActive}
      onClick={onClick}
    >
      {text}
    </Btn>
  );
}

export default LanguageButton;
