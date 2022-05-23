import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Box, Button, ClickAwayListener, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TCreateTaskFieldProps } from './CreateTaskField.types';

export function CreateTaskField({
  createTask,
  onRequestClose,
}: TCreateTaskFieldProps) {
  const [taskTitleInput, setTaskTitleInput] = useState('');
  const { t } = useTranslation();
  // const addTask = (e: MouseEvent) => {
  //   e.stopPropagation();
  //   if (taskTitleInput) {
  //     createTask(taskTitleInput);
  //   }
  //   onRequestClose();
  // };

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
          placeholder={t('boardPage.enterTaskTitleText')}
          value={taskTitleInput}
          onChange={handleOnChange}
        />
      </ClickAwayListener>
      <Button>{t('boardPage.addTaskBtn')}</Button>
      <Button onClick={onRequestClose}>X</Button>
    </Box>
  );
}
