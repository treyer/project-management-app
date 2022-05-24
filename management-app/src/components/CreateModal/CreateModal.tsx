import { ChangeEvent, FormEvent } from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Box,
  Typography,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type TCreateModal = {
  isModalOpen: boolean;
  titleModal: string;
  inputName: string;
  labelName: string;
  btnName: string;
  isDisabled: boolean;
  onClose: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCreate: (event: MouseEvent | FormEvent) => void;
};

function CreateModal({
  isModalOpen,
  inputName,
  titleModal,
  labelName,
  btnName,
  isDisabled,
  onCreate,
  onClose,
  onChange,
}: TCreateModal) {
  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        top: '25%',
      }}
    >
      <Grid
        id="transition-modal-title"
        container
        padding={2}
        direction="column"
        justifyContent="center"
        width="300px"
        height="270px"
        sx={{
          border: '1px solid grey',
          borderRadius: '5px',
          position: 'relative',
          background: '#ffffff',
          margin: '0 auto',
        }}
      >
        <IconButton
          aria-label="close"
          size="small"
          sx={{ position: 'absolute', top: '0', right: '0' }}
          onClick={onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <Typography
          component="p"
          sx={{
            fontSize: '20px',
            textTransform: 'uppercase',
            color: '#808080',
            borderBottom: '1px solid',
            marginBottom: '20px',
          }}
        >
          {titleModal}
        </Typography>

        <Box component="form" onSubmit={onCreate} sx={{ Width: '600px' }}>
          <Typography component="p" gutterBottom>
            {inputName}
          </Typography>
          <TextField
            id="outlined-basic"
            label={labelName}
            variant="outlined"
            size="small"
            sx={{ marginBottom: '20px', width: '100%' }}
            onChange={onChange}
          />
        </Box>
        <Button
          variant="contained"
          size="medium"
          onClick={onCreate}
          disabled={isDisabled}
        >
          {btnName}
        </Button>
      </Grid>
    </Modal>
  );
}

export default CreateModal;
