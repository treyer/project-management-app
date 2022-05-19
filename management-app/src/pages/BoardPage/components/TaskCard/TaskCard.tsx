import { useDrag } from 'react-dnd';

import { Box, Typography } from '@mui/material';
import { updateTask } from '../../boardSlice';

import { TTaskCardProps } from './TaskCard.types';
import { useAppDispatch } from '../../../../store';

// TODO: use TColumn instead of BoardColumnProps?
export function TaskCard({ taskInfo, columnId, boardId }: TTaskCardProps) {
  const { title, id, description, order, userId } = taskInfo;

  const dispatch = useAppDispatch();

  const [, drag] = useDrag(() => ({
    type: 'taskCard',
    item: { id, title, description, order, userId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const finishColumnId = monitor.getDropResult() as { id: string };
      dispatch(
        updateTask({
          boardId,
          columnId,
          taskId: id,
          task: {
            title,
            order,
            description,
            userId,
            boardId,
            columnId: finishColumnId?.id,
          },
        })
      );
    },
  }));
  return (
    <Box
      ref={drag}
      data-column-id={columnId}
      data-board-id={boardId}
      sx={{
        borderRadius: 2,
        bgcolor: '#fff',
        margin: 2,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        cursor: 'grabbing',
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
  );
}
