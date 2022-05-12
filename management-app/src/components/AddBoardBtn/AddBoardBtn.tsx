import { Grid, Typography } from '@mui/material';

function AddBoardBtn() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="230px"
      height="170px"
      sx={{
        border: '1px dashed grey',
        borderRadius: '5px',
        backgroundColor: '#d2d6de',
        '&:hover': {
          backgroundColor: '#d2d6de',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: '20px',
          textTransform: 'uppercase',
        }}
      >
        Add board
      </Typography>
    </Grid>
  );
}

export default AddBoardBtn;
