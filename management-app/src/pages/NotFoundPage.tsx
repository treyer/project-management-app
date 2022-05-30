import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const Link = styled(NavLink)({
  textDecoration: 'none',
  color: '#000000',
  '&:hover': {
    opacity: '0.8',
  },
});

function NotFoundPage() {
  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 52px - 56px)',
      }}
    >
      <img src="/assets/img/page-not-found.png" alt="Not found page" />
      <Typography component="span" variant="h6" sx={{ marginTop: '20px' }}>
        <Link to="/">Go Home Page</Link>
      </Typography>
    </Grid>
  );
}

export default NotFoundPage;
