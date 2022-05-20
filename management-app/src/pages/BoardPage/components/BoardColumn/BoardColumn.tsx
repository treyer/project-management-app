/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import { TBoardColumnProps } from './BoardColumn.types';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store';
import { setColumnTitle, createTask } from '../../boardSlice';
import { CreateTaskField } from '../CreateTaskField';
import { TColumnResponse, TTaskResponse } from '../../../../api/types';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
import { getTasksByColumnId } from '../../BoardPage.utils';
import { CreateTaskModal } from '../CreateTaskModal';
// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id: columnId, title, order }: TBoardColumnProps) {
  const dispatch = useAppDispatch();

  const { id: boardId } = useAppSelector((state) => state.board.boardContent);
  const userIdLS = localStorage.getItem('userId') ?? '';
  const { id } = useAppSelector((state) => state.auth.userData);
  const userId = id ?? userIdLS;

  const { tasks } =
    useAppSelector((state) => getTasksByColumnId(state, columnId)) ?? [];

  const [isAddTaskFieldOpen, setIsAddTaskFieldOpen] = useState(false);
  const [totalTasksCount, setTotalTasksCount] = useState(tasks.length);

  const addNewTask = (taskTitleInput: string) => {
    const nextTaskOrder = totalTasksCount + 1;
    dispatch(
      createTask({
        boardId,
        columnId,
        task: {
          title: taskTitleInput,
          order: nextTaskOrder,
          description: taskTitleInput,
          userId,
        },
      })
    );
  };

  const handleClickAway = (titleInput: string) => {
    dispatch(
      setColumnTitle({
        boardId,
        columnId,
        column: { title: titleInput, order },
      })
    );
  };
  // TODO: useMemo for tasks callbacks
  const exitAddTaskField = () => {
    setIsAddTaskFieldOpen(false);
  };

  const openAddTaskField = () => {
    setIsAddTaskFieldOpen(true);
  };

  return (
    <Box>
      <Box sx={{ borderRadius: 2, backgroundColor: '#eee' }}>
        <Stack spacing={2}>
          <ColumnTitle title={title} handleClickAway={handleClickAway} />

          {tasks &&
            tasks.map(
              (
                {
                  id,
                  title,
                  order,
                  done,
                  description,
                  userId,
                  files,
                }: TTaskResponse,
                index
              ) => {
                const uniqueKey = index + id;
                return (
                  <TaskCard
                    key={uniqueKey}
                    taskInfo={{
                      id,
                      title,
                      order,
                      done,
                      description,
                      userId,
                      files,
                    }}
                  />
                );
              }
            )}
          {!isAddTaskFieldOpen ? (
            <Button onClick={openAddTaskField}>+ Add a task</Button>
          ) : (
            <CreateTaskModal
              createTask={addNewTask}
              onRequestClose={exitAddTaskField}
              isModalOpen={isAddTaskFieldOpen}
            />
            // <CreateTaskField
            //   createTask={addNewTask}
            //   onRequestClose={exitAddTaskField}
            // />
          )}
        </Stack>
      </Box>
    </Box>
  );
}
