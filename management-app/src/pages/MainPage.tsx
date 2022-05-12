import { Grid } from '@mui/material';

import AddBoardBtn from '../components/AddBoardBtn/AddBoardBtn';
import BoardModal from '../components/BoardModal/BoardModal';

function MainPage() {
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
      <AddBoardBtn />
      <BoardModal />
    </Grid>
  );
}

export default MainPage;
