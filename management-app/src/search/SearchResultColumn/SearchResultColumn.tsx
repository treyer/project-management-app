import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { TResultColumn } from '../types';

type TType = {
  board: TResultColumn;
};

function SearchResultColumn({ board }: TType) {
  return (
    <NavLink to={`/boards/${board.boardId}`}>
      <Typography>
        - в названии колонки {`"${board.columnTitle}"`} доски{' '}
        {`"${board.boardTitle}"`}
        {board.boardTitle}
      </Typography>
    </NavLink>
  );
}

export default SearchResultColumn;
