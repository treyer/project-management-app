/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useState, MouseEvent } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TBoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { updateColumn, createTask, deleteColumn } from '../../boardSlice';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
import { getTasksByColumnId } from '../../BoardPage.utils';

import { TTaskResponse } from '../../../../api/types';
import CreateModal from '../../../../components/CreateModal/CreateModal';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';

// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: TBoardColumnProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isRenderDescription, setIsRenderDescription] =
    useState<boolean>(false);

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
  const [isDialogOpen, setDialogOpen] = useState(false);

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
      setIsAddTaskFieldOpen(false);
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

  const exitAddTaskField = () => {
    setIsAddTaskFieldOpen(false);
  };

  const openAddTaskField = useCallback(() => {
    setIsAddTaskFieldOpen(true);
    setIsRenderDescription(true);
  }, []);

  const handleDeleteColumn = (event: MouseEvent) => {
    event.preventDefault();
    setDialogOpen(true);
  };

  const handleDecline = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(deleteColumn({ boardId, columnId: id }));
    setDialogOpen(false);
  }, [dispatch, boardId, id]);

  return (
    <Draggable draggableId={id} index={order - 1}>
      {(provided) => (
        <Box
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          ref={provided.innerRef}
          id={id}
        >
          {isDialogOpen && (
            <ConfirmMessage
              openDialog={isDialogOpen}
              text={t('boardPage.ifDeleteColumnMessage')}
              onConfirm={handleConfirm}
              onDecline={handleDecline}
            />
          )}
          <Box
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.dragHandleProps}
            sx={{
              borderRadius: 2,
              backgroundColor: '#eee',
              position: 'relative',
              minWidth: '290px',
              maxWidth: '290px',
              minHeight: '75vh',
              maxHeight: '75vh',
            }}
          >
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleDeleteColumn}
              sx={{
                position: 'absolute',
                top: '0',
                right: '0',
              }}
            >
              <DeleteIcon />
            </IconButton>
            <Stack
              spacing={2}
              sx={[
                {
                  '&:hover': {
                    backgroundColor: '#e5eff8',
                  },
                },
                {
                  '&:active': {
                    backgroundColor: '#ffffff',
                  },
                },
              ]}
            >
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
              {!isAddTaskFieldOpen ? (
                <Button onClick={openAddTaskField}>
                  {t('boardPage.addTaskText')}
                </Button>
              ) : (
                <CreateModal
                  isModalOpen={isAddTaskFieldOpen}
                  titleModal={t('taskModal.titleModal')}
                  inputName={t('taskModal.inputName')}
                  labelName={t('taskModal.labelName')}
                  btnName={t('taskModal.btnName')}
                  onSubmit={addNewTask}
                  onClose={exitAddTaskField}
                  isRenderDescription={isRenderDescription}
                  descriptionName={t('taskModal.descriptionName')}
                  labelDescription={t('taskModal.labelDescription')}
                />
              )}
            </Stack>
          </Box>
        </Box>
      )}
    </Draggable>
  );
}
