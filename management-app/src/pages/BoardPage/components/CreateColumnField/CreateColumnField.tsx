import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Box, Button, ClickAwayListener, TextField } from '@mui/material';
import { TCreateColumnFieldProps } from './CreateColumnField.types';

export function CreateColumnField({
  createColumn,
  onRequestClose,
}: TCreateColumnFieldProps) {
  const [columnTitleInput, setColumnTitleInput] = useState('');

  const addColumn = (e: MouseEvent) => {
    e.stopPropagation();
    if (columnTitleInput) {
      createColumn(columnTitleInput);
    }
    onRequestClose();
  };

  const handleClickAway = () => {
    if (columnTitleInput) {
      createColumn(columnTitleInput);
    }
    onRequestClose();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnTitleInput(e.target.value);
  };

  return (
    <Box>
      <ClickAwayListener onClickAway={handleClickAway}>
        <TextField
          fullWidth
          name="column title"
          placeholder="Enter a title for this column..."
          value={columnTitleInput}
          onChange={handleOnChange}
        />
      </ClickAwayListener>
      <Button onClick={addColumn}>Add column</Button>
      <Button onClick={onRequestClose}>X</Button>
    </Box>
  );
}
