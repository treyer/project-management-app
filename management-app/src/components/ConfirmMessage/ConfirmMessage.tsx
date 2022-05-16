import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

type TConfirmMessage = {
  openDialog: boolean;
  text: string;
  onConfirm: () => void;
  onDecline: () => void;
};

function ConfirmMessage({
  openDialog,
  text,
  onConfirm,
  onDecline,
}: TConfirmMessage) {
  return (
    <Dialog aria-labelledby="responsive-dialog-title" open={openDialog}>
      <DialogTitle id="responsive-dialog-title">Confirm message</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onConfirm}>
          Yes
        </Button>
        <Button autoFocus onClick={onDecline}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmMessage;
