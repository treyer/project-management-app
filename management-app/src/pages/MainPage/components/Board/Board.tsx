import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../../store';
import { deleteBoard } from '../../slice/mainSlice';

type TTypeProps = {
  titleBoard: string;
  id: string;
};

function Board({ titleBoard, id }: TTypeProps) {
  const dispatch = useAppDispatch();

  const handleDeleteBoard = useCallback(() => {
    dispatch(deleteBoard(id));
  }, [dispatch, id]);

  return (
    <NavLink to={`/main/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 230, height: 170 }}>
        <CardHeader
          action={
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleDeleteBoard}
            >
              <DeleteIcon />
            </IconButton>
          }
          title={titleBoard}
        />
        <CardMedia
          component="img"
          height="70"
          image="./assets/svg/board.svg"
          alt="board"
        />
      </Card>
    </NavLink>
  );
}

export default Board;
