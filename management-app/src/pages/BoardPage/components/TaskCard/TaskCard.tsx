/* eslint-disable max-len */
import { useState, useCallback, MouseEvent } from 'react';
import { t } from 'i18next';
import { Draggable } from 'react-beautiful-dnd';

import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TTaskCardProps } from './TaskCard.types';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';
import { deleteTask } from '../../boardSlice';
import { useAppDispatch } from '../../../../store';

// TODO: use TColumn instead of BoardColumnProps?
export function TaskCard({
  index,
  taskInfo,
  columnId,
  boardId,
}: TTaskCardProps) {
  const { title, id } = taskInfo;
  const [isDialogOpen, setDialogOpen] = useState(false);
  // const { columns } = useAppSelector((state) => state.board.boardData);

  const dispatch = useAppDispatch();

  const handleDeleteColumn = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setDialogOpen(true);
  }, []);

  const handleDecline = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(deleteTask({ boardId, columnId, taskId: id }));
    setDialogOpen(false);
  }, [boardId, columnId, id, dispatch]);

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
          sx={{
            borderRadius: 2,
            bgcolor: '#fff',
            margin: 2,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            cursor: 'grabbing',
            position: 'relative',
          }}
        >
          {isDialogOpen && (
            <ConfirmMessage
              openDialog={isDialogOpen}
              text={t('boardPage.ifDeleteTaskMessage')}
              onConfirm={handleConfirm}
              onDecline={handleDecline}
            />
          )}
          <>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={handleDeleteColumn}
              sx={{
                position: 'absolute',
                top: '0',
                right: '0',
              }}
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="subtitle1">{title}</Typography>
          </>
        </Box>
      )}
    </Draggable>
  );
}
