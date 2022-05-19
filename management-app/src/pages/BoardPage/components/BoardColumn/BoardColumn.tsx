/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

import { TBoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { setColumnTitle, createTask } from '../../boardSlice';
import { CreateTaskField } from '../CreateTaskField';
import { TTaskResponse } from '../../../../api/types';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
import { getTasksByColumnId } from '../../BoardPage.utils';
// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: TBoardColumnProps) {
  const dispatch = useAppDispatch();

  const { id: boardId } = useAppSelector((state) => state.board.boardData);
  const userIdLS = localStorage.getItem('userId') ?? '';
  const { id: userDataId } = useAppSelector((state) => state.auth.userData);
  const userId = userDataId ?? userIdLS;

  const { tasks } =
    useAppSelector((state) => getTasksByColumnId(state, id)) ?? [];

  const [isAddTaskFieldOpen, setIsAddTaskFieldOpen] = useState(false);
  const [totalTasksCount, setTotalTasksCount] = useState(tasks.length);

  const addNewTask = (taskTitleInput: string) => {
    const nextTaskOrder = totalTasksCount + 1;
    dispatch(
      createTask({
        boardId,
        columnId: id,
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

  const [, drop] = useDrop(() => ({
    accept: 'taskCard',
    drop: (item: TTaskResponse, monitor) => {
      return { id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // TODO: add logic for dnd column
  const [, drag] = useDrag(() => ({
    type: 'boardColumn',
    item: { id, title, order },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // eslint-disable-next-line no-console
      console.log(monitor.getDropResult());
    },
  }));

  return (
    <Box id={id} ref={drag}>
      <Box
        ref={drop}
        sx={{ borderRadius: 2, backgroundColor: '#eee', cursor: 'grabbing' }}
      >
        <Stack spacing={2}>
          <ColumnTitle title={title} handleClickAway={handleClickAway} />

          {tasks &&
            tasks.map(
              (
                {
                  id: taskId,
                  title,
                  order,
                  done,
                  description,
                  userId,
                  files,
                }: TTaskResponse,
                index: number
              ) => {
                const uniqueKey = index + taskId;
                return (
                  <TaskCard
                    key={uniqueKey}
                    columnId={id}
                    boardId={boardId}
                    taskInfo={{
                      id: taskId,
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
