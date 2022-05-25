/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TBoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { updateColumn, createTask } from '../../boardSlice';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
import { getTasksByColumnId } from '../../BoardPage.utils';
import { CreateTaskModal } from '../CreateTaskModal';
import { TTaskResponse } from '../../../../api/types';

// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: TBoardColumnProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { id: boardId } = useAppSelector((state) => state.board.boardData);
  // TODO:
  const userIdLS = localStorage.getItem('userId') ?? '';
  const { id: userDataId } = useAppSelector((state) => state.auth.userData);
  const userId = userDataId ?? userIdLS;

  let { tasks } =
    useAppSelector((state) => getTasksByColumnId(state, id)) ?? [];

  const tasksForSort = [...tasks];
  tasksForSort.sort((a, b) => {
    return a.order > b.order ? 1 : -1;
  });
  tasks = [...tasksForSort];

  const [isAddTaskFieldOpen, setIsAddTaskFieldOpen] = useState(false);

  const addNewTask = useCallback(
    (taskTitleInput: string, taskDescription: string) => {
      dispatch(
        createTask({
          boardId,
          columnId: id,
          task: {
            title: taskTitleInput,
            description: taskDescription,
            userId,
          },
        })
      );
    },
    [dispatch, boardId, id, userId]
  );

  const handleClickAway = (titleInput: string) => {
    dispatch(
      updateColumn({
        boardId,
        columnId: id,
        column: { title: titleInput, order },
      })
    );
  };

  const exitAddTaskField = useCallback(() => {
    setIsAddTaskFieldOpen(false);
  }, []);

  const openAddTaskField = () => {
    setIsAddTaskFieldOpen(true);
  };

  return (
    <Draggable draggableId={id} index={order - 1}>
      {(provided) => (
        <Box
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          ref={provided.innerRef}
          id={id}
          sx={{ minWidth: 250, maxWidth: 250 }}
        >
          <Box
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.dragHandleProps}
            sx={{
              borderRadius: 2,
              backgroundColor: '#eee',
            }}
          >
            <Stack spacing={2}>
              <ColumnTitle title={title} handleClickAway={handleClickAway} />
              <Droppable droppableId={id} type="task">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.droppableProps}
                    sx={{
                      overflow: 'auto',
                      maxHeight: '60vh',
                      cursor: 'grabbing',
                    }}
                  >
                    {tasks.map(
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
                            index={index}
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

                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
              {!isAddTaskFieldOpen && (
                <Button onClick={openAddTaskField}>
                  {t('boardPage.addTaskText')}
                </Button>
              )}
              <CreateTaskModal
                createTask={addNewTask}
                onRequestClose={exitAddTaskField}
                isModalOpen={isAddTaskFieldOpen}
              />
            </Stack>
          </Box>
        </Box>
      )}
    </Draggable>
  );
}
