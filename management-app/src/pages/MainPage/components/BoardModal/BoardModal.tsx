/* eslint-disable max-len */
import {
  FormEvent,
  useCallback,
  MouseEvent,
  ChangeEvent,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  closeBoardModal,
  closeDialog,
  createBoard,
  getBoards,
} from '../../slice/mainSlice';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';

type TBoardModalProps = {
  onClose: () => void;
};

function BoardModal({ onClose }: TBoardModalProps) {
  const navigate = useNavigate();
  const { isDialogOpen } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.main.boardData.id);

  const [titleBoard, setTitleBoard] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const handleSubmitBoard = useCallback(
    (event: MouseEvent | FormEvent) => {
      event.preventDefault();
      dispatch(createBoard({ title: titleBoard }));
    },
    [titleBoard, dispatch]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value as string;
      if (value !== '') {
        setDisabled(false);
      }
      setTitleBoard(value);
    },
    []
  );

  const handleDecline = useCallback(() => {
    dispatch(closeDialog());
    dispatch(getBoards());
    dispatch(closeBoardModal());
  }, [dispatch]);

  const handleConfirm = useCallback(() => {
    navigate(`/boards/${boardId}`);
    handleDecline();
  }, [boardId, handleDecline, navigate]);

  return (
    <>
      {isDialogOpen && (
        <ConfirmMessage
          openDialog={isDialogOpen}
          text="Would you like go to the new board?"
          onConfirm={handleConfirm}
          onDecline={handleDecline}
        />
      )}
      <Grid
        container
        padding={2}
        direction="column"
        justifyContent="flex-start"
        width="230px"
        height="370px"
        sx={{
          border: '1px solid grey',
          borderRadius: '5px',
          position: 'relative',
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
          }}
        >
          Add board
        </Typography>
        <Box
          sx={{
            width: '190px',
            height: '115px',
            backgroundColor: '#d2d6de',
            borderRadius: '5px',
            margin: '15px auto',
          }}
        >
          <img
            src="./assets/svg/board.svg"
            alt="board"
            style={{ width: '190px', height: '115px' }}
          />
        </Box>
        <Box component="form" onSubmit={handleSubmitBoard} sx={{ Width: 600 }}>
          <Typography component="p" gutterBottom>
            Board name
          </Typography>
          <TextField
            id="outlined-basic"
            label="Add board name"
            variant="outlined"
            size="small"
            sx={{ marginBottom: '20px' }}
            onChange={handleInputChange}
          />
        </Box>
        <Button
          variant="contained"
          size="medium"
          onClick={handleSubmitBoard}
          disabled={isDisabled}
        >
          Add board
        </Button>
      </Grid>
    </>
  );
}

export default BoardModal;
