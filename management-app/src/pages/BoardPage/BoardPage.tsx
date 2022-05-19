import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, Skeleton } from '@mui/material';
import { useDrop } from 'react-dnd';

import { useParams } from 'react-router-dom';
import { createColumn, getBoard } from './boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

import { BoardColumn } from './components/BoardColumn';
import { TColumn, TColumnResponse } from '../../api/types';
import { CreateColumnField } from './components/CreateColumnField';

export function BoardPage() {
  const { boardId } = useParams();
  const columns = useAppSelector(
    (state: RootState) => state.board.boardData.columns ?? []
  );
  const { isBoardLoading } = useAppSelector((state: RootState) => state.board);

  const [isAddColumnFieldOpen, setIsAddColumnFieldOpen] = useState(false);
  // TODO: create a const newColumnOrder = .. without totalColumnsCount
  const [totalColumnsCount, setTotalColumnsCount] = useState(columns.length);
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const addNewColumn = useCallback(
    (columnTitleInput: string) => {
      const newColumnOrder = totalColumnsCount + 1;
      if (boardId) {
        dispatch(
          createColumn({
            boardId,
            column: {
              title: columnTitleInput,
              order: newColumnOrder,
            },
          })
        )
          .unwrap()
          .then(() => setError(''))
          .catch((e) => {
            setError(
              typeof e.message === 'string' ? e.message : 'Unknown Error'
            );
          });
      }
    },
    [boardId, dispatch, totalColumnsCount]
  );

  useEffect(() => {
    if (boardId) {
      dispatch(getBoard(boardId))
        .unwrap()
        .then(() => setError(''))
        .catch((e) => {
          setError(typeof e.message === 'string' ? e.message : 'Unknown Error');
        });
    }
  }, [dispatch, boardId]);

  const exitAddColumnField = useCallback(() => {
    setIsAddColumnFieldOpen(false);
  }, []);

  const openAddColumnField = () => {
    setIsAddColumnFieldOpen(true);
  };

  // TODO: add logic for dnd column
  const [, drop] = useDrop(() => ({
    accept: 'boardColumn',
    drop: (item: TColumn, monitor) => {
      return { item };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box m={3} ref={drop}>
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={{ xs: 2 }} sx={{ height: '85vh' }}>
        {isBoardLoading
          ? [...Array(3)].map((elem, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Grid item xs={2} key={index}>
                  <Skeleton variant="rectangular" height={400} />
                </Grid>
              );
            })
          : columns &&
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
