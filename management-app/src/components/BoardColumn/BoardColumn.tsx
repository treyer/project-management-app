import React from 'react';
import { Box, Stack } from '@mui/material';

import { BoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../store';
import { setColumnTitle } from '../../features/boardSlice';
import { ColumnTitle } from '../ColumnTitle';
// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: BoardColumnProps) {
  const dispatch = useAppDispatch();

  const { id: boardId } = useAppSelector((state) => state.board);

  const handleClickAway = (titleInput: string) => {
    dispatch(
      setColumnTitle({
        boardId,
        columnId: id,
        column: { title: titleInput, order },
      })
    );
  };

  return (
    <Box>
      <Box sx={{ borderRadius: 3, backgroundColor: '#eee' }}>
        <Stack spacing={2}>
          <ColumnTitle title={title} handleClickAway={handleClickAway} />
        </Stack>
      </Box>
    </Box>
  );
}
