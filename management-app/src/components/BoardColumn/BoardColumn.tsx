import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import { BoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../store';
import { setColumnTitle, createTask } from '../../features/boardSlice';
import { CreateTaskField } from '../CreateTaskField';
import { TColumnResponse } from '../../api/types';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: BoardColumnProps) {
  const dispatch = useAppDispatch();

  const { id: boardId } = useAppSelector((state) => state.board);
  const { tasks } = useAppSelector((state) => {
    const currentColumn = state.board.columns.find(
      (column) => column.id === id
    );
    if (currentColumn) {
      return currentColumn;
    }
    return {} as TColumnResponse;
  });

  const [isAddTaskFieldOpen, setIsAddTaskFieldOpen] = useState(false);
  const [totalTasksCount, setTotalTasksCount] = useState(tasks.length);

  useEffect(() => {
    setTotalTasksCount(tasks.length);
  }, [tasks]);

  const addNewTask = (taskTitleInput: string) => {
    const taskOrder = totalTasksCount + 1;
    dispatch(
      createTask({
        boardId,
        columnId: id,
        task: {
          title: taskTitleInput,
          order: taskOrder,
          description: taskTitleInput,
          userId: '1',
        },
      })
    );
  };

  const handleClickAway = (titleInput: string) => {
    dispatch(
      setColumnTitle({
        boardId,
        columnId: id,
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
              // eslint-disable-next-line @typescript-eslint/no-shadow
              ({ id, title, order, done, description, userId, files }) => (
                <TaskCard
                  key={id}
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
              )
            )}
          {!isAddTaskFieldOpen ? (
            <Button onClick={openAddTaskField}>+ Add a task</Button>
          ) : (
            <CreateTaskField
              createTask={addNewTask}
              onRequestClose={exitAddTaskField}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
}
