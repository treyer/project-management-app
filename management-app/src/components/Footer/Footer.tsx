import React from 'react';
import { Grid, Link } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import style from './Footer.module.css';
import GitLink from '../GitLink/GitLink';

const Item = styled('div')({
  color: '#ffffff',
  padding: 8,
});

function Footer() {
  const matches = useMediaQuery('(max-width:574px)');
  const matches1 = useMediaQuery('(min-width:465px)');

  return (
    <footer className={style.footer}>
      <Grid
        container
        justifyContent={matches ? 'center' : 'space-between'}
        alignItems="center"
        className={style.container}
      >
        <Grid container item style={{ width: 'auto' }}>
          {matches1 && (
            <Grid item>
              <Item>© 2022</Item>
            </Grid>
          )}
          <Grid
            container
            item
            style={{ width: 'auto' }}
            justifyContent={matches ? 'center' : 'space-between'}
          >
            <Grid item>
              <GitLink
                linkSrc="https://github.com/MarinaPresmytskaia"
                text="Marina Presmytskaia"
              />
            </Grid>
            <Grid item>
              <GitLink
                linkSrc="https://github.com/ElenaBezro"
                text="Elena Bezrodnova"
              />
            </Grid>
            <Grid item>
              <GitLink
                linkSrc="https://github.com/treyer"
                text="Andrei Kazhanenka"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Link
            href="https://rs.school/index.html"
            target="_blank"
            rel="noreferrer"
          >
            <Item
              className={style.logo}
              style={{
                backgroundImage: `url(./assets/svg/rss.svg)`,
              }}
            />
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
