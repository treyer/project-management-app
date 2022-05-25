import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import GitLink from '../GitLink/GitLink';
import RssLogo from '../RssLogo/RssLogo';

function Footer() {
  const matches = useMediaQuery('(max-width:615px)');
  const matches1 = useMediaQuery('(min-width:510px)');
  const matches2 = useMediaQuery('(max-width:445px)');

  const { t } = useTranslation();

  return (
    <footer>
      <Box
        sx={{
          maxWidth: 1200,
          minHeight: 56,
          backgroundColor: 'primary.main',
          margin: '0 auto',
        }}
      >
        <Grid
          container
          justifyContent={matches ? 'center' : 'space-between'}
          alignItems="center"
          flexDirection={matches2 ? 'column' : 'row'}
        >
          <Grid container item style={{ width: 'auto' }}>
            {matches1 && (
              <Grid item>
                <Typography
                  sx={{
                    padding: '8px',
                    fontSize: 14,
                    color: 'primary.contrastText',
                  }}
                >
                  © 2022
                </Typography>
              </Grid>
            )}
            <Grid
              container
              item
              style={{ width: 'auto' }}
              justifyContent={matches ? 'center' : 'space-between'}
              flexDirection={matches2 ? 'column' : 'row'}
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
              <RssLogo />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}

export default Footer;
