import { FormEvent, useCallback } from 'react';

import { Grid, Typography, Box, TextField, Button } from '@mui/material';

function BoardModal() {
  const handleSubmitBoard = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  return (
    <Grid
      padding={2}
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
      <Box component="form" onSubmit={handleSubmitBoard} sx={{ Width: 600 }}>
        <Typography component="p" gutterBottom>
          Board name
        </Typography>
        <TextField
          id="outlined-basic"
          label="Add board name"
          variant="outlined"
          size="small"
          sx={{ marginBottom: '7px' }}
        />
      </Box>
      <Button variant="outlined" size="medium">
        Add board
      </Button>
    </Grid>
  );
}

export default BoardModal;
