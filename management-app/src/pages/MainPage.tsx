import { Grid } from '@mui/material';
import { useState, MouseEvent, useCallback } from 'react';

import AddBoardBtn from '../components/AddBoardBtn/AddBoardBtn';
import BoardModal from '../components/BoardModal/BoardModal';

function MainPage() {
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);

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
      <AddBoardBtn onClick={handleOpenCardModal} />
      {isModalCardOpen && <BoardModal onClose={handleCloseCardModel} />}
    </Grid>
  );
}

export default MainPage;
