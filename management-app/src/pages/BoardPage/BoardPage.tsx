import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';

import { useParams } from 'react-router-dom';
import { getBoard } from './boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
// eslint-disable-next-line import/extensions
import { BoardColumn } from './components/BoardColumn';
import { TColumnResponse } from '../../api/types';

export function BoardPage() {
  const { boardId } = useParams();

  // const boardId = '9a111e19-24ec-43e1-b8c4-13776842b8d5';

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardId) {
      dispatch(getBoard(boardId));
    }
  }, [dispatch]);

  const columns = useAppSelector((state: RootState) => state.board.columns);
  return (
    <Box m={3}>
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
    </Box>
  );
}
