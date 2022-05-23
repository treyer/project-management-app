import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Dialog aria-labelledby="responsive-dialog-title" open={openDialog}>
      <DialogTitle id="responsive-dialog-title">
        {t('mainPage.confirmMessageText')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onConfirm}>
          {t('mainPage.yes')}
        </Button>
        <Button autoFocus onClick={onDecline}>
          {t('mainPage.no')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmMessage;
