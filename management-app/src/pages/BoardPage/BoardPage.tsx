import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Skeleton, Stack } from '@mui/material';
import { useDrop } from 'react-dnd';

import { useParams } from 'react-router-dom';
import { createColumn, getBoard } from './boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

import { BoardColumn } from './components/BoardColumn';
import { TColumn, TColumnResponse } from '../../api/types';
import { CreateColumnModal } from './components/CreateColumnModal';

export function BoardPage() {
  const { boardId } = useParams();

  const { isBoardLoading } = useAppSelector((state: RootState) => state.board);

  const [isAddColumnFieldOpen, setIsAddColumnFieldOpen] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();

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

  // TODO: find a way to store columns in the right order instead of using sort
  let columns = useAppSelector(
    (state: RootState) => state.board.boardData.columns
  );
  const columnsForSort = [...columns];
  columnsForSort.sort((a, b) => {
    return a.order > b.order ? 1 : -1;
  });
  columns = [...columnsForSort];

  console.log(`render board with ${columns.length} columns`);

  const addNewColumn = useCallback(
    (columnTitleInput: string) => {
      const newColumnOrder = columns.length + 1;
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
    [boardId, columns.length, dispatch]
  );

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
    <Box
      ref={drop}
      sx={{ overflowX: 'auto', p: 3, width: '100%', justifySelf: 'start' }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <Stack direction="row" spacing={2}>
        {isBoardLoading
          ? [...Array(3)].map((elem, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Skeleton key={index} variant="rectangular" height={400} />
              );
            })
          : columns &&
            columns.map((column: TColumnResponse) => (
              <BoardColumn
                key={column.id}
                id={column.id}
                title={column.title}
                order={column.order}
              />
            ))}
        {!isAddColumnFieldOpen ? (
          <Button sx={{ height: 100 }} onClick={openAddColumnField}>
            + Add a column
          </Button>
        ) : (
          <CreateColumnModal
            createColumn={addNewColumn}
            onRequestClose={exitAddColumnField}
            isModalOpen={isAddColumnFieldOpen}
          />
        )}
        {/* </Grid> */}
      </Stack>
    </Box>
  );
}
