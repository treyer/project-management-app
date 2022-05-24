import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Skeleton, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDrop } from 'react-dnd';

import { useParams } from 'react-router-dom';
import { createColumn, getBoard } from './boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

import { BoardColumn } from './components/BoardColumn';
import { TColumn, TColumnResponse } from '../../api/types';
import CreateModal from '../../components/CreateModal/CreateModal';

export function BoardPage() {
  const { t } = useTranslation();
  const { boardId } = useParams();

  const { isBoardLoading } = useAppSelector((state: RootState) => state.board);

  const [isAddColumnFieldOpen, setIsAddColumnFieldOpen] = useState(false);
  const [error, setError] = useState('');
  const [columnTitleInput, setColumnTitleInput] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardId) {
      dispatch(getBoard(boardId))
        .unwrap()
        .then(() => setError(''))
        .catch((e) => {
          setError(
            typeof e.message === 'string'
              ? e.message
              : t('boardPage.unknownError')
          );
        });
    }
  }, [dispatch, boardId, t]);

  // TODO: find a way to store columns in the right order instead of using sort
  let columns = useAppSelector(
    (state: RootState) => state.board.boardData.columns
  );
  const columnsForSort = [...columns];
  columnsForSort.sort((a, b) => {
    return a.order > b.order ? 1 : -1;
  });
  columns = [...columnsForSort];

  const addNewColumn = useCallback(() => {
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
            typeof e.message === 'string'
              ? e.message
              : t('boardPage.unknownError')
          );
        });
    }
    setIsAddColumnFieldOpen(false);
  }, [boardId, columnTitleInput, columns.length, dispatch, t]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value as string;
      if (value !== '') {
        setDisabled(false);
      }
      setColumnTitleInput(value);
    },
    []
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
            {t('boardPage.addColumnText')}
          </Button>
        ) : (
          <CreateModal
            isModalOpen={isAddColumnFieldOpen}
            titleModal={t('columnModal.titleModal')}
            inputName={t('columnModal.inputName')}
            labelName={t('columnModal.labelName')}
            btnName={t('columnModal.btnName')}
            isDisabled={isDisabled}
            onCreate={addNewColumn}
            onClose={exitAddColumnField}
            onChange={handleInputChange}
          />
        )}
      </Stack>
    </Box>
  );
}
