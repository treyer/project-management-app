import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';

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
      <Grid
        direction="column"
        justifyContent="flex-start"
        width="230px"
        height="370px"
        sx={{
          border: '1px solid grey',
          borderRadius: '5px',
        }}
      >
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
            margin: '7px auto',
          }}
        >
          <img src="./assets/svg/board.svg" alt="board" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default MainPage;
