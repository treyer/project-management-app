/* eslint-disable max-len */
import { useCallback, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../../store';
import { closeDialog, deleteBoard } from '../../slice/mainSlice';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';

type TBoardProps = {
  titleBoard: string;
  id: string;
};

function Board({ titleBoard, id }: TBoardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteBoard = useCallback((event: MouseEvent) => {
    event.preventDefault();

    setDialogOpen(true);
  }, []);

  const handleDecline = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(deleteBoard(id));
    dispatch(closeDialog());
  }, [dispatch, id]);

  return (
    <>
      {isDialogOpen && (
        <ConfirmMessage
          openDialog={isDialogOpen}
          text="Would you like delete the board?"
          onConfirm={handleConfirm}
          onDecline={handleDecline}
        />
      )}
      <NavLink to={`/board/${id}`} style={{ textDecoration: 'none' }}>
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
    </>
  );
}

export default Board;
