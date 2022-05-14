import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../../store';

function ConfirmMessage() {
  const boardId = useAppSelector((state) => state.main.boardData.boardId);
  const isDialogOpen = useAppSelector((state) => state.main.isDialogOpen);

  // eslint-disable-next-line no-console
  console.log(boardId);
  return (
    <Dialog aria-labelledby="responsive-dialog-title" open={isDialogOpen}>
      <DialogTitle id="responsive-dialog-title">Confirm message</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like go to the new board?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <NavLink to={`/board/${boardId}`}>
          <Button autoFocus>Yes</Button>
        </NavLink>
        <Button autoFocus>No</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmMessage;
