import React from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TResultTask } from '../types';

type TType = {
  task: TResultTask;
};

function SearchResultTask({ task }: TType) {
  const { t } = useTranslation();

  return (
    <NavLink to={`/boards/${task.boardId}`} style={{ textDecoration: 'none' }}>
      <Typography sx={{ fontSize: 14 }} align="left">
        {t('search.in')}{' '}
        {task.isMatchTitle ? t('search.title') : t('search.description')}{' '}
        {t('search.task')}{' '}
        <Box
          component="span"
          fontWeight="fontWeightMedium"
        >{`"${task.taskTitle}"`}</Box>
        {t('search.column')}{' '}
        <Box
          component="span"
          fontWeight="fontWeightMedium"
        >{`"${task.columnTitle}"`}</Box>
        {t('search.desk')}
        <Box component="span" fontWeight="fontWeightMedium">
          {`"${task.boardTitle.trim()}"`}
        </Box>
      </Typography>
    </NavLink>
  );
}

export default SearchResultTask;
