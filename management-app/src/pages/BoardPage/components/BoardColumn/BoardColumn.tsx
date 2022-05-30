/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useState, MouseEvent } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { useTheme } from '@mui/material/styles';
import { TBoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { updateColumn, createTask, deleteColumn } from '../../boardSlice';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
import { getTasksByColumnId } from '../../BoardPage.utils';

import { TTaskResponse } from '../../../../api/types';
import CreateModal from '../../../../components/CreateModal/CreateModal';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';
import { comparator } from '../../../../utils';

// TODO: use TColumn instead of BoardColumnProps?
export function BoardColumn({ id, title, order }: TBoardColumnProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const [isRenderDescription, setIsRenderDescription] =
    useState<boolean>(false);

  const { id: boardId } = useAppSelector((state) => state.board.boardData);
  // TODO:
  const userIdLS = localStorage.getItem('userId') ?? '';
  const { id: userDataId } = useAppSelector((state) => state.auth.userData);
  const userId = userDataId ?? userIdLS;

  const tasks = useAppSelector((state) =>
    [...(getTasksByColumnId(state, id) ?? [])].sort(comparator)
  );

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
            height="calc(100vh - 230px) !important"
            sx={{
              borderRadius: 2,
              backgroundColor: 'secondary.light',
              position: 'relative',
              minWidth: '290px',
              maxWidth: '290px',
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
                color: theme.palette.mode === 'dark' ? '#61dafb' : '#8195a2',
              }}
            >
              <DeleteIcon />
            </IconButton>

            <Stack
              spacing={2}
              borderRadius={3}
              height="100%"
              sx={[
                {
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#ffffff' : '#c9e9ff',
                  },
                },
                {
                  '&:active': {
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#ffffff' : '#c9e9ff',
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
                      maxHeight: '100%',
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
                <Button
                  onClick={openAddTaskField}
                  sx={{ backgroundColor: '#ffffff' }}
                >
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
