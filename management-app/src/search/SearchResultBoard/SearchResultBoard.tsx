import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { TResultBoard } from '../types';

type TType = {
  board: TResultBoard;
};

function SearchResultBoard({ board }: TType) {
  return (
    <NavLink to={`/boards/${board.boardId}`}>
      <Typography>
        - в {board.isMatchTitle ? 'названии' : 'описании'} доски{' '}
        {`"${board.boardTitle}"`}
      </Typography>
    </NavLink>
  );
}

export default SearchResultBoard;
