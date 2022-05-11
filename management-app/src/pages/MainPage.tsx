import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

function MainPage() {
  return (
    <Grid
      container
      spacing={3}
      gap={3}
      direction="row"
      justifyContent="flex-start"
      margin="15px auto"
      height="75vh"
      maxWidth="1200px"
    >
      <Box
        sx={{
          p: 8,
          height: '5%',
          border: '1px dashed grey',
          borderRadius: '5px',
          backgroundColor: '#d2d6de',
          '&:hover': {
            backgroundColor: '#d2d6de',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Button>Add board</Button>
      </Box>
      <Box
        sx={{
          p: 8,
          height: '5%',
          border: '1px dashed grey',
          borderRadius: '5px',
          backgroundColor: '#d2d6de',
          '&:hover': {
            backgroundColor: '#d2d6de',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Button>Add board</Button>
      </Box>
    </Grid>
  );
}

export default MainPage;
