/* eslint-disable max-len */
import { useState, useCallback, MouseEvent } from 'react';
import { t } from 'i18next';
import { Draggable } from 'react-beautiful-dnd';

import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { TTaskCardProps } from './TaskCard.types';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';
import { deleteTask, updateTask } from '../../boardSlice';
import { useAppDispatch } from '../../../../store';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

// TODO: use TColumn instead of BoardColumnProps?
export function TaskCard({
  index,
  taskInfo,
  columnId,
  boardId,
}: TTaskCardProps) {
  const { title, id, description } = taskInfo;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showUpdateTaskMenu, setShowUpdateTaskMenu] = useState(false);

  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteTask = (event: MouseEvent) => {
    event.preventDefault();
    setDialogOpen(true);
    setAnchorEl(null);
  };

  const handleEditTask = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setShowUpdateTaskMenu(true);
    setAnchorEl(null);
  }, []);

  const handleDecline = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(deleteTask({ boardId, columnId, taskId: id }));
    setDialogOpen(false);
  }, [boardId, columnId, id, dispatch]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exitEditTaskField = () => {
    setShowUpdateTaskMenu(false);
  };

  const handleUpdateTask = useCallback(
    (titleTask: string, descriptionTask: string) => {
      setAnchorEl(null);
      if (titleTask && descriptionTask) {
        dispatch(
          updateTask({
            boardId,
            columnId,
            taskId: id,
            task: {
              title: titleTask,
              order: taskInfo.order,
              description: descriptionTask,
              userId: taskInfo.userId,
              boardId,
              columnId,
            },
          })
        );
      } else {
        dispatch(
          updateTask({
            boardId,
            columnId,
            taskId: id,
            task: {
              title: taskInfo.title,
              order: taskInfo.order,
              description: taskInfo.description,
              userId: taskInfo.userId,
              boardId,
              columnId,
            },
          })
        );
      }
    },
    [
      boardId,
      columnId,
      id,
      dispatch,
      taskInfo.order,
      taskInfo.userId,
      taskInfo.description,
      taskInfo.title,
    ]
  );

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Box
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-column-id={columnId}
          data-board-id={boardId}
          sx={[
            {
              borderRadius: 2,
              bgcolor: '#fff',
              margin: 2,
              padding: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              cursor: 'grabbing',
              position: 'relative',
              minHeight: '100px',
              maxHeight: '115px',
              overflow: 'hidden',
              minWidth: '150px',
              maxWidth: '250px',
              backgroundColor: 'primary.main',
            },
            {
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            },
            {
              '&:active': {
                backgroundColor: 'primary.main',
              },
            },
          ]}
        >
          {isDialogOpen && (
            <ConfirmMessage
              openDialog={isDialogOpen}
              text={t('boardPage.ifDeleteTaskMessage')}
              onConfirm={handleConfirm}
              onDecline={handleDecline}
            />
          )}
          {showUpdateTaskMenu && (
            <EditTaskModal
              isModalOpen={showUpdateTaskMenu}
              titleModal={t('editTaskModal.titleModal')}
              inputName={t('editTaskModal.inputName')}
              labelName={t('editTaskModal.labelName')}
              descriptionName={t('editTaskModal.descriptionName')}
              labelDescriptionName={t('editTaskModal.labelDescription')}
              btnName={t('editTaskModal.btnName')}
              onSubmit={handleUpdateTask}
              onClose={exitEditTaskField}
              defaultTaskTitle={taskInfo.title}
              defaultTaskDescription={taskInfo.description}
            />
          )}
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                position: 'absolute',
                top: '0',
                right: '0',
              }}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEditTask}>
                <>
                  <EditIcon />
                  {t('editTaskModal.edit')}
                </>
              </MenuItem>
              <MenuItem onClick={handleDeleteTask}>
                <>
                  <DeleteIcon />
                  {t('editTaskModal.delete')}
                </>
              </MenuItem>
            </Menu>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="left"
              paddingLeft="10px"
              width="100%"
              height="100%"
            >
              {description}
            </Typography>
          </>
        </Box>
      )}
    </Draggable>
  );
}
