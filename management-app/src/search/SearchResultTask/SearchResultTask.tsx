import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { TResultTask } from '../types';

type TType = {
  board: TResultTask;
};

function SearchResultTask({ board }: TType) {
  return (
    <NavLink to={`/boards/${board.boardId}`}>
      <Typography>
        - в {board.isMatchTitle ? 'названии' : 'описании'} таска{' '}
        {`"${board.taskTitle}"`} колонки {`"${board.columnTitle}"`} доски
        {`"${board.boardTitle}"`}
      </Typography>
    </NavLink>
  );
}

export default SearchResultTask;
