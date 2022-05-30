import React, { useEffect, useState } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import style from './Logo.module.css';

type TType = {
  isActive: boolean;
};

function Logo({ isActive }: TType) {
  const [mouseOver, setMouseOver] = useState(false);
  const theme = useTheme();

  const matches = useMediaQuery('(min-width:720px)');
  const matches1 = useMediaQuery('(max-width:585px)');

  const imageSrcArr: string[] = [
    '/assets/img/logo.png',
    '/assets/img/logo_hover.png',
    '/assets/img/logo_dark_mode.png',
    '/assets/img/logo_dark_mode_hover.png',
  ];

  useEffect(() => {
    imageSrcArr.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  });

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
            // eslint-disable-next-line no-nested-ternary
            mouseOver || isActive
              ? theme.palette.mode === 'dark'
                ? '/assets/img/logo_dark_mode_hover.png'
                : '/assets/img/logo_hover.png'
              : theme.palette.mode === 'dark'
              ? '/assets/img/logo_dark_mode.png'
              : '/assets/img/logo.png'
          }
          alt="Logo img"
        />
      </Grid>
      {(matches || matches1) && (
        <Grid>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: mouseOver || isActive ? '500' : '900',
              color: mouseOver || isActive ? '#cccccc' : '#fff',
            }}
          >
            Manage App
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default Logo;
