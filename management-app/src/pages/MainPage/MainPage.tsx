import { Alert, CircularProgress, Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AddBoardBtn from './components/AddBoardBtn/AddBoardBtn';
import Board from './components/Board/Board';

import BoardModal from './components/BoardModal/BoardModal';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeBoardModal, getBoards, openBoardModal } from './slice/mainSlice';

function MainPage() {
  const boards = useAppSelector((state) => state.main.boards);
  const isBoardModalOpen = useAppSelector(
    (state) => state.main.isBoardModalOpen
  );
  const isLoading = useAppSelector((state) => state.main.isLoading);
  const isError = useAppSelector((state) => state.main.isError);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const handleOpenBoardModal = useCallback(() => {
    dispatch(openBoardModal());
  }, [dispatch]);

  const handleCloseBoardModel = useCallback(() => {
    dispatch(closeBoardModal());
  }, [dispatch]);

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
      <Grid
        container
        spacing={3}
        gap={3}
        direction="row"
        alignContent="flex-start"
        margin="0 auto"
        padding="50px"
        minHeight="75vh"
        maxWidth="1200px"
        width="100%"
      >
        {boards.map(({ id, title, columns }) => (
          <Board
            key={id}
            id={id}
            titleBoard={title}
            columnNum={columns.length}
          />
        ))}
        <AddBoardBtn onClick={handleOpenBoardModal} />
        {isBoardModalOpen && <BoardModal onClose={handleCloseBoardModel} />}
      </Grid>
    </>
  );
}

export default MainPage;
