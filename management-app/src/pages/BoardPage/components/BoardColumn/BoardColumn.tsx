/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

import { TBoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { setColumnTitle, createTask } from '../../boardSlice';
import { CreateTaskField } from '../CreateTaskField';
import { TColumnResponse, TTaskResponse } from '../../../../api/types';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: TBoardColumnProps) {
  const dispatch = useAppDispatch();

  const { id: boardId } = useAppSelector((state) => state.board.boardData);
  const userIdLS = localStorage.getItem('userId') ?? '';
  const { id: userId } =
    useAppSelector((state) => state.auth.userData) ?? userIdLS;
  const { tasks } =
    useAppSelector((state) => {
      const currentColumn = state.board.boardData.columns.find(
        (column) => column.id === id
      );
      if (currentColumn) {
        return currentColumn;
      }
      return {} as TColumnResponse;
    }) ?? [];

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
              ({
                id: taskId,
                title,
                order,
                done,
                description,
                userId,
                files,
              }: TTaskResponse) => (
                <TaskCard
                  key={taskId}
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
