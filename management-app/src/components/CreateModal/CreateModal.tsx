import { ChangeEvent, useCallback, useState, useEffect } from 'react';
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
  onClose: () => void;
  onSubmit: (titleInput: string, taskDescription: string) => void;
  isRenderDescription?: boolean;
  descriptionName?: string;
  labelDescription?: string;
};

function CreateModal({
  isModalOpen,
  inputName,
  titleModal,
  labelName,
  btnName,
  onSubmit,
  onClose,
  isRenderDescription,
  descriptionName,
  labelDescription,
}: TCreateModal) {
  const [titleInput, setTitleInput] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value as string;

      setTitleInput(value);
    },
    []
  );

  const handleChangeDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value as string;

      setTaskDescription(value);
    },
    []
  );

  useEffect(() => {
    if (titleInput !== '') {
      setDisabled(false);
      if (isRenderDescription && taskDescription === '') {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [titleInput, taskDescription, isRenderDescription]);

  const handelSubmit = useCallback(() => {
    onSubmit(titleInput, taskDescription);
  }, [titleInput, onSubmit, taskDescription]);

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
        container
        padding={2}
        direction="column"
        justifyContent="center"
        width="300px"
        minHeight="270px"
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

        <Box component="form" onSubmit={handelSubmit} sx={{ Width: '600px' }}>
          <Typography component="p" gutterBottom>
            {inputName}
          </Typography>
          <TextField
            id="outlined-basic"
            label={labelName}
            variant="outlined"
            size="small"
            sx={{ marginBottom: '20px', width: '100%' }}
            onChange={handleInputChange}
          />

          {isRenderDescription && (
            <>
              <Typography component="p" gutterBottom>
                {descriptionName}
              </Typography>
              <TextField
                id="outlined-basic"
                label={labelDescription}
                variant="outlined"
                size="small"
                sx={{ marginBottom: '20px', width: '100%' }}
                onChange={handleChangeDescription}
              />
            </>
          )}
        </Box>
        <Button
          variant="contained"
          size="medium"
          onClick={handelSubmit}
          disabled={isDisabled}
        >
          {btnName}
        </Button>
      </Grid>
    </Modal>
  );
}

CreateModal.defaultProps = {
  isRenderDescription: false,
  descriptionName: '',
  labelDescription: '',
};

export default CreateModal;
