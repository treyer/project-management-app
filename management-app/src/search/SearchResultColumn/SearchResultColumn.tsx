import React from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TResultColumn } from '../types';

type TType = {
  board: TResultColumn;
};

function SearchResultColumn({ board }: TType) {
  const { t } = useTranslation();

  return (
    <NavLink to={`/boards/${board.boardId}`} style={{ textDecoration: 'none' }}>
      <Typography sx={{ fontSize: 14 }} align="left">
        {t('search.inColumnName')}{' '}
        <Box
          component="span"
          fontWeight="fontWeightMedium"
        >{`"${board.columnTitle}"`}</Box>{' '}
        {t('search.desk')}
        <Box component="span" fontWeight="fontWeightMedium">
          {`"${board.boardTitle.trim()}"`}
        </Box>
      </Typography>
    </NavLink>
  );
}

export default SearchResultColumn;
