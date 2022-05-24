import { useDrag } from 'react-dnd';
import { Draggable } from 'react-beautiful-dnd';

import { Box, Typography } from '@mui/material';

import { TTaskCardProps } from './TaskCard.types';
import { useAppDispatch, useAppSelector } from '../../../../store';

// TODO: use TColumn instead of BoardColumnProps?
export function TaskCard({
  index,
  taskInfo,
  columnId,
  boardId,
}: TTaskCardProps) {
  const { title, id, description, order, userId } = taskInfo;
  const { columns } = useAppSelector((state) => state.board.boardData);

  const dispatch = useAppDispatch();

  // const [, drag] = useDrag(
  //   () => ({
  //     type: 'taskCard',
  //     item: { id, title, description, order, userId },
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //     }),
  //     end: (item, monitor) => {
  //       const finishColumnId = monitor.getDropResult() as { id: string };

  //       const finishColumn = columns.find(
  //         (column) => column.id === finishColumnId.id
  //       ) as TColumnResponse;

  //       const taskOrder = finishColumn.tasks.length + 1;
  //       dispatch(
  //         updateTask({
  //           boardId,
  //           columnId,
  //           taskId: id,
  //           task: {
  //             title,
  //             order: taskOrder,
  //             description,
  //             userId,
  //             boardId,
  //             columnId: finishColumnId?.id,
  //           },
  //         })
  //       );
  //     },
  //   }),
  //   [columns]
  // );
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Box
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // ref={drag}
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
      )}
    </Draggable>
  );
}
