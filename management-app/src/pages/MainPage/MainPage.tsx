import { Grid } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';

import AddBoardBtn from './components/AddBoardBtn/AddBoardBtn';
import Board from './components/Board/Board';

import BoardModal from './components/BoardModal/BoardModal';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBoards } from './slice/mainSlice';

function MainPage() {
  const boards = useAppSelector((state) => state.main.boards);
  const dispatch = useAppDispatch();

  const [isModalCardOpen, setIsModalCardOpen] = useState(false);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const handleOpenCardModal = useCallback(() => {
    setIsModalCardOpen(true);
  }, []);

  const handleCloseCardModel = useCallback(() => {
    setIsModalCardOpen(false);
  }, []);

  return (
    <Grid
      container
      spacing={3}
      gap={3}
      direction="row"
      alignContent="flex-start"
      margin="0 auto"
      padding="50px"
      height="75vh"
      maxWidth="1200px"
      width="100%"
    >
      {boards.map(({ id, title }) => (
        <Board key={id} id={id} titleBoard={title} />
      ))}
      <AddBoardBtn onClick={handleOpenCardModal} />
      {isModalCardOpen && <BoardModal onClose={handleCloseCardModel} />}
    </Grid>
  );
}

export default MainPage;
