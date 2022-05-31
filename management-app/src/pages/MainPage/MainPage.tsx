import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddBoardBtn from './components/AddBoardBtn/AddBoardBtn';
import Board from './components/Board/Board';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  closeBoardModal,
  closeDialog,
  createBoard,
  getBoards,
  openBoardModal,
} from './slice/mainSlice';
import CreateModal from '../../components/CreateModal/CreateModal';
import ConfirmMessage from '../../components/ConfirmMessage/ConfirmMessage';

function MainPage() {
  const [isRenderDescription, setIsRenderDescription] = useState<boolean>(true);

  const navigate = useNavigate();
  const { isDialogOpen } = useAppSelector((state) => state.main);

  const boardId = useAppSelector((state) => state.main.boardData.id);

  const boards = useAppSelector((state) => state.main.boards);
  const isBoardModalOpen = useAppSelector(
    (state) => state.main.isBoardModalOpen
  );

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const isLoading = useAppSelector((state) => state.main.isLoading);
  const isError = useAppSelector((state) => state.main.isError);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleOpenBoardModal = useCallback(() => {
    dispatch(openBoardModal());
    setIsRenderDescription(true);
  }, [dispatch]);

  const handleCloseBoardModel = useCallback(() => {
    dispatch(closeBoardModal());
  }, [dispatch]);

  const handleSubmitBoard = useCallback(
    (titleBoard: string, titleDescription: string) => {
      dispatch(
        createBoard({ title: titleBoard, description: titleDescription })
      );
    },
    [dispatch]
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
      {isLoading && (
        <CircularProgress
          color="inherit"
          sx={{ position: 'fixed', top: '50%' }}
        />
      )}
      {isError && (
        <Alert severity="error">{t('mainPage.errSomethingWentWrong')}</Alert>
      )}
      {isDialogOpen && (
        <ConfirmMessage
          openDialog={isDialogOpen}
          text={t('mainPage.ifGoToNewBoardMessage')}
          onConfirm={handleConfirm}
          onDecline={handleDecline}
        />
      )}
      <Grid
        container
        spacing={3}
        gap={2.5}
        direction="column"
        alignContent="flex-start"
        margin="0 auto"
        padding="25px"
        minHeight="75vh"
        maxWidth="1200px"
        width="100%"
      >
        {boards.map(({ id, title, description, columns }) => (
          <Board
            key={id}
            id={id}
            description={description}
            titleBoard={title}
            columnNum={columns.length}
          />
        ))}
        <AddBoardBtn onClick={handleOpenBoardModal} />
        <CreateModal
          isModalOpen={isBoardModalOpen}
          titleModal={t('mainPage.AddBoardBtn')}
          inputName={t('mainPage.boardNameText')}
          labelName={t('mainPage.addBoardNameLabel')}
          btnName={t('mainPage.AddBoardBtn')}
          onSubmit={handleSubmitBoard}
          onClose={handleCloseBoardModel}
          isRenderDescription={isRenderDescription}
          descriptionName={t('mainPage.descriptionName')}
          labelDescription={t('mainPage.labelDescription')}
        />
      </Grid>
    </>
  );
}

export default MainPage;
