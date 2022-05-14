import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useCallback } from 'react';

import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store';
import { closeDialog } from '../../slice/mainSlice';

function ConfirmMessage() {
  const boardId = useAppSelector((state) => state.main.boardData.id);
  const isDialogOpen = useAppSelector((state) => state.main.isDialogOpen);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  return (
    <Dialog aria-labelledby="responsive-dialog-title" open={isDialogOpen}>
      <DialogTitle id="responsive-dialog-title">Confirm message</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like go to the new board?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <NavLink to={`/main/${boardId}`} style={{ textDecoration: 'none' }}>
          <Button autoFocus>Yes</Button>
        </NavLink>
        <Button autoFocus onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmMessage;
