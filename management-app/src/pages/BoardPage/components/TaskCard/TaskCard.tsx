import { Draggable } from 'react-beautiful-dnd';

import { Box, Typography } from '@mui/material';

import { TTaskCardProps } from './TaskCard.types';

// TODO: use TColumn instead of BoardColumnProps?
export function TaskCard({
  index,
  taskInfo,
  columnId,
  boardId,
}: TTaskCardProps) {
  const { title, id } = taskInfo;
  // const { columns } = useAppSelector((state) => state.board.boardData);

  // const dispatch = useAppDispatch();

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
          }}
        >
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
      )}
    </Draggable>
  );
}
