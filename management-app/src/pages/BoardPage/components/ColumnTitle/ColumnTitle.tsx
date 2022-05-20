import React, { ChangeEvent, useState } from 'react';
import { Box, ClickAwayListener, TextField, Typography } from '@mui/material';
import { TColumnTitleProps } from './ColumnTitle.types';

export function ColumnTitle({ title, handleClickAway }: TColumnTitleProps) {
  const [titleInput, setTitleInput] = useState(title);
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const toggleTitleEditMode = () => {
    if (!isTitleEditMode) {
      setIsTitleEditMode(true);
    }
  };

  const onClickAway = () => {
    if (isTitleEditMode) {
      handleClickAway(titleInput);
      setIsTitleEditMode(false);
    }
  };

  return (
    <Box>
      <ClickAwayListener onClickAway={onClickAway}>
        <Typography variant="h6">
          {!isTitleEditMode ? (
            <Box onClick={toggleTitleEditMode} sx={{ cursor: 'pointer' }}>
              {title}
            </Box>
          ) : (
            <TextField
              fullWidth
              name="column title"
              value={titleInput}
              color="primary"
              onChange={handleOnChange}
            />
          )}
        </Typography>
      </ClickAwayListener>
    </Box>
  );
}
