import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, ClickAwayListener, TextField } from '@mui/material';
import { TCreateColumnFieldProps } from './CreateColumnField.types';

export function CreateColumnField({
  createColumn,
  onRequestClose,
}: TCreateColumnFieldProps) {
  const [columnTitleInput, setColumnTitleInput] = useState('');
  const { t } = useTranslation();

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
          placeholder={t('boardPage.enterTitleForColumnText')}
          value={columnTitleInput}
          onChange={handleOnChange}
        />
      </ClickAwayListener>
      <Button onClick={addColumn}>{t('boardPage.addColumnBtn')}</Button>
      <Button onClick={onRequestClose}>X</Button>
    </Box>
  );
}
