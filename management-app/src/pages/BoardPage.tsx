import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import { getBoard } from '../features/boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store';
// eslint-disable-next-line import/extensions
import { BoardColumn } from '../components/BoardColumn';
import { TColumnResponse } from '../api/types';
// import { useParams } from 'react-router-dom';

function BoardPage() {
  const boardId = '9a111e19-24ec-43e1-b8c4-13776842b8d5';

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoard(boardId));
  }, [dispatch]);

  const columns = useAppSelector((state: RootState) => state.board.columns);
  return (
    <Grid container spacing={{ xs: 2 }} sx={{ height: '85vh' }}>
      {columns &&
        columns.map((column: TColumnResponse) => (
          <Grid item xs={2} key={column.id}>
            <BoardColumn
              id={column.id}
              title={column.title}
              order={column.order}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default BoardPage;
