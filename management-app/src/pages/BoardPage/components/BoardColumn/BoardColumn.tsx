/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import { TBoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { setColumnTitle, createTask } from '../../boardSlice';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
import { getTasksByColumnId } from '../../BoardPage.utils';
import { CreateTaskModal } from '../CreateTaskModal';
import { TTaskResponse } from '../../../../api/types';
// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id: columnId, title, order }: TBoardColumnProps) {
  const dispatch = useAppDispatch();

  const { id: boardId } = useAppSelector((state) => state.board.boardContent);
  const userIdLS = localStorage.getItem('userId') ?? '';
  const { id } = useAppSelector((state) => state.auth.userData);
  const userId = id ?? userIdLS;

  let { tasks } =
    useAppSelector((state) => getTasksByColumnId(state, columnId)) ?? [];
  // TODO: find a way to store tasks in the right order instead of using sort
  const tasksForSort = [...tasks];
  tasksForSort.sort((a, b) => {
    return a.order > b.order ? 1 : -1;
  });
  tasks = [...tasksForSort];
  console.log(tasks);

  const [isAddTaskFieldOpen, setIsAddTaskFieldOpen] = useState(false);

  const addNewTask = (taskTitleInput: string) => {
    const nextTaskOrder = tasks.length + 1;
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
