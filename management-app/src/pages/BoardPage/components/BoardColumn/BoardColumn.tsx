/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useState } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useDrag, useDrop } from 'react-dnd';

import { TBoardColumnProps } from './BoardColumn.types';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  setColumnTitle,
  createTask,
  deleteColumn,
  getBoard,
} from '../../boardSlice';
import { TaskCard } from '../TaskCard';
import { ColumnTitle } from '../ColumnTitle';
import { getTasksByColumnId } from '../../BoardPage.utils';

import { TTaskResponse } from '../../../../api/types';
import CreateModal from '../../../../components/CreateModal/CreateModal';
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
      setColumnTitle({
        boardId,
        columnId: id,
        column: { title: titleInput, order },
      })
    );
  };

  const exitAddTaskField = useCallback(() => {
    setIsAddTaskFieldOpen(false);
  }, []);

  const openAddTaskField = useCallback(() => {
    setIsAddTaskFieldOpen(true);
    setIsRenderDescription(true);
  }, []);

  const handleDeleteColumn = useCallback(() => {
    dispatch(deleteColumn({ boardId, columnId: id }));
    dispatch(getBoard(boardId));
  }, [dispatch, boardId, id]);

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
    <Box id={id} ref={drag} sx={{ minWidth: 250, maxWidth: 250 }}>
      <Box
        ref={drop}
        sx={{
          borderRadius: 2,
          backgroundColor: '#eee',
          cursor: 'grabbing',
          position: 'relative',
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
        <Stack spacing={2}>
          <ColumnTitle title={title} handleClickAway={handleClickAway} />
          <Box sx={{ overflow: 'auto', maxHeight: '60vh' }}>
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
          </Box>
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
  );
}
