import React, { useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled('div')(({ theme }) => ({
  padding: 8,
  width: '90px',
  height: '30px',
  backgroundSize: '90px auto',
  backgroundRepeat: 'no-repeat',
  marginTop: '10px',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'url(/assets/svg/rss_dark_mode.svg)'
      : 'url(/assets/svg/rss.svg)',
}));

function RssLogo() {
  const imageSrcArr: string[] = [
    '/assets/svg/rss.svg',
    '/assets/svg/rss_dark_mode.svg',
  ];

  useEffect(() => {
    imageSrcArr.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  });

  return <Item style={{}} />;
}

export default RssLogo;
