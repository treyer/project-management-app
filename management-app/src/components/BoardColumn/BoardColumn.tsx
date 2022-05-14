import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  ClickAwayListener,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { BoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../store';
import { setColumnTitle } from '../../features/boardSlice';
// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: BoardColumnProps) {
  const [isTitleInputDisabled, setIsTitleInputDisabled] = useState(true);
  const [titleInput, setTitleInput] = useState(title);

  const dispatch = useAppDispatch();

  const { id: boardId } = useAppSelector((state) => state.board);

  const handleTitleOnClick = () => {
    if (isTitleInputDisabled) {
      setIsTitleInputDisabled(false);
    }
  };

  const handleClickAway = () => {
    if (!isTitleInputDisabled) {
      setIsTitleInputDisabled(true);
      dispatch(
        setColumnTitle({
          boardId,
          columnId: id,
          column: { title: titleInput, order },
        })
      );
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  return (
    <Box>
      <Box sx={{ borderRadius: 3, backgroundColor: '#eee' }}>
        <Stack spacing={2}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Typography variant="h5">
              <TextField
                fullWidth
                value={titleInput}
                color="primary"
                // disabled={isTitleInputDisabled}
                onClick={handleTitleOnClick}
                onChange={handleOnChange}
              />
            </Typography>
          </ClickAwayListener>
        </Stack>
      </Box>
    </Box>
  );
}
