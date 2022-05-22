import React, { useEffect } from 'react';
import { Grid, Link } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import style from './Footer.module.css';
import GitLink from '../GitLink/GitLink';

const Item = styled('div')({
  color: '#ffffff',
  padding: 8,
});

function Footer() {
  const matches = useMediaQuery('(max-width:574px)');
  const matches1 = useMediaQuery('(min-width:465px)');

  const { t } = useTranslation();

  const imageSrcArr: string[] = ['/assets/svg/rss.svg'];

  useEffect(() => {
    imageSrcArr.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  });

  return (
    <footer className={style.footer}>
      <div className={style.wrapper}>
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
                  text={t('footer.Marina')}
                />
              </Grid>
              <Grid item>
                <GitLink
                  linkSrc="https://github.com/ElenaBezro"
                  text={t('footer.Lena')}
                />
              </Grid>
              <Grid item>
                <GitLink
                  linkSrc="https://github.com/treyer"
                  text={t('footer.Andrei')}
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
                  backgroundImage: `url(/assets/svg/rss.svg)`,
                }}
              />
            </Link>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

export default Footer;
