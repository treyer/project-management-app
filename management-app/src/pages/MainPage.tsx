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
      <Box
        sx={{
          width: '230px',
          height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
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
      </Box>
    </Grid>
  );
}

export default MainPage;
