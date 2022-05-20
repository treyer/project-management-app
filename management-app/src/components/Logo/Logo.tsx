import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import style from './Logo.module.css';

function Logo() {
  const [mouseOver, setMouseOver] = useState(false);

  const matches = useMediaQuery('(min-width:720px)');
  const matches1 = useMediaQuery('(max-width:585px)');

  return (
    <Grid
      container
      item
      alignItems="center"
      className={style.logo}
      style={{ width: 'auto' }}
      onMouseOver={() => setMouseOver(true)}
      onFocus={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      onBlur={() => setMouseOver(false)}
    >
      <Grid>
        <img
          className={style.image}
          style={{ display: 'block' }}
          src={
            mouseOver ? './assets/img/logo_hover.png' : './assets/img/logo.png'
          }
          alt="Logo img"
        />
      </Grid>
      {(matches || matches1) && (
        <Grid>
          <Typography
            variant="h5"
            component="h1"
            style={
              mouseOver
                ? { fontWeight: '500', color: '#cccccc' }
                : { fontWeight: '900', color: '#ffffff' }
            }
          >
            Manage App
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default Logo;
