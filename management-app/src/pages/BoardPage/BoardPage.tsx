import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';

import { useParams } from 'react-router-dom';
import { createColumn, getBoard } from './boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
// eslint-disable-next-line import/extensions
import { BoardColumn } from './components/BoardColumn';
import { TColumnResponse } from '../../api/types';
import { CreateColumnField } from './components/CreateColumnField';

export function BoardPage() {
  const { boardId } = useParams();
  const columns = useAppSelector(
    (state: RootState) => state.board.columns ?? []
  );

  const [isAddColumnFieldOpen, setIsAddColumnFieldOpen] = useState(false);
  const [totalColumnsCount, setTotalColumnsCount] = useState(columns.length);

  useEffect(() => {
    setTotalColumnsCount(columns.length);
  }, [columns]);

  const dispatch = useAppDispatch();
  const addNewColumn = (columnTitleInput: string) => {
    const columnOrder = totalColumnsCount + 1;
    if (boardId) {
      dispatch(
        createColumn({
          boardId,
          column: {
            title: columnTitleInput,
            order: columnOrder,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (boardId) {
      dispatch(getBoard(boardId));
    }
  }, [dispatch, boardId]);

  const exitAddColumnField = () => {
    setIsAddColumnFieldOpen(false);
  };

  const openAddColumnField = () => {
    setIsAddColumnFieldOpen(true);
  };

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
        {!isAddColumnFieldOpen ? (
          <Button sx={{ height: 100 }} onClick={openAddColumnField}>
            + Add a column
          </Button>
        ) : (
          <CreateColumnField
            createColumn={addNewColumn}
            onRequestClose={exitAddColumnField}
          />
        )}
      </Grid>
    </Box>
  );
}
