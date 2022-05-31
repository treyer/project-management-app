import { memo } from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type TProps = {
  onClick: () => void;
};

function AddBoardBtn({ onClick }: TProps) {
  const { t } = useTranslation();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="270px"
      height="200px"
      sx={{
        border: '1px dashed grey',
        borderRadius: '5px',
        backgroundColor: '#d2d6de',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#d2d6de',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      onClick={onClick}
    >
      <Typography
        component="p"
        sx={{
          fontSize: '20px',
          textTransform: 'uppercase',
        }}
      >
        {t('mainPage.AddBoardBtn')}
      </Typography>
    </Grid>
  );
}

export default memo(AddBoardBtn);
