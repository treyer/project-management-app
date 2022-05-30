import React from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { TResultBoard } from '../types';

type TType = {
  board: TResultBoard;
};

function SearchResultBoard({ board }: TType) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <NavLink to={`/boards/${board.boardId}`} style={{ textDecoration: 'none' }}>
      <Typography
        sx={{
          fontSize: 14,
          paddingLeft: '10px',
          color: 'primary.contrastText',
          '&:hover': {
            opacity: '0.8',
          },
        }}
        align="left"
      >
        {t('search.in')}{' '}
        {board.isMatchTitle ? t('search.title') : t('search.description')}{' '}
        {t('search.desk')}
        <Box
          component="span"
          fontWeight="fontWeightMedium"
          color={theme.palette.mode === 'dark' ? '#f04408' : '#000000'}
        >
          {`"${board.boardTitle.trim()}"`}
        </Box>
      </Typography>
    </NavLink>
  );
}

export default SearchResultBoard;
