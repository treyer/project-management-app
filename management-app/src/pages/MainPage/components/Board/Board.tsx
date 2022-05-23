/* eslint-disable max-len */
import { useCallback, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../../store';
import { closeDialog, deleteBoard } from '../../slice/mainSlice';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';

type TBoardProps = {
  titleBoard: string;
  id: string;
  columnNum: number;
};

function Board({ titleBoard, id, columnNum }: TBoardProps) {
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
      <NavLink to={`/boards/${id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: '270px',
            height: '200px',
            backgroundImage: 'url(./assets/svg/board.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            position: 'relative',
          }}
        >
          <CardHeader
            sx={{ textAlign: 'left' }}
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
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'left', position: 'absolute', bottom: '5px' }}
            >
              {`Number of Columns: ${columnNum}`}
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
    </>
  );
}

export default Board;
