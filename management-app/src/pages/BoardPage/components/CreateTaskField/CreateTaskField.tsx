import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Box, Button, ClickAwayListener, TextField } from '@mui/material';
import { CreateTaskFieldProps } from './CreateTaskField.types';

export function CreateTaskField({
  createTask,
  onRequestClose,
}: CreateTaskFieldProps) {
  const [taskTitleInput, setTaskTitleInput] = useState('');

  const addTask = (e: MouseEvent) => {
    e.stopPropagation();
    if (taskTitleInput) {
      createTask(taskTitleInput);
    }
    onRequestClose();
  };

  const handleClickAway = () => {
    if (taskTitleInput) {
      createTask(taskTitleInput);
    }
    onRequestClose();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitleInput(e.target.value);
  };

  return (
    <Box>
      <ClickAwayListener onClickAway={handleClickAway}>
        <TextField
          fullWidth
          name="tack title"
          placeholder="Enter a title for this task..."
          value={taskTitleInput}
          onChange={handleOnChange}
        />
      </ClickAwayListener>
      <Button onClick={addTask}>Add task</Button>
      <Button onClick={onRequestClose}>X</Button>
    </Box>
  );
}
