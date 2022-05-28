import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TeamInfoCard from './components/TeamInfoCard';
import { TEAM_INFO } from './constants';

import style from './WelcomePage.module.css';

function WelcomePage() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div
      className={style.main}
      style={{
        backgroundColor: theme.palette.mode === 'dark' ? '#8796a5' : '#fff',
      }}
    >
      <div className={style.sectionStart}>
        <Card className={style.card && style.hidden}>
          <CardMedia
            component="img"
            alt="img"
            sx={{ minWidth: '480px', maxWidth: '500px', height: '500px' }}
            image="/assets/img/hero.png"
          />
        </Card>
        <Card
          className={style.card}
          sx={{ minWidth: '300px', maxWidth: '500px', minHeight: '500px' }}
        >
          <CardContent>
            <Typography variant="h2" paddingTop={3} className={style.infoTitle}>
              Manage App
            </Typography>
            <Typography
              className={style.info}
              component="p"
              paddingTop={4}
              paddingBottom={4}
              fontSize={18}
              sx={{ textAlign: 'justify' }}
            >
              {t('welcomePage.aboutAppText')}
            </Typography>
            <Typography
              component="p"
              fontSize={14}
              fontWeight={600}
              sx={{ textAlign: 'left' }}
            >
              {t('welcomePage.registerText')}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div
        className={style.containerParal}
        style={{
          backgroundImage: `url(/assets/img/office.png)`,
        }}
      />
      <div className={style.container}>
        <Typography variant="h3" paddingTop={0}>
          {t('welcomePage.teamTitle')}
        </Typography>
      </div>
      <div className={style.sectionEnd}>
        {Object.values(TEAM_INFO).map(({ name, src, info, path }) => (
          <TeamInfoCard
            key={name}
            name={t(`aboutTeam.${name}`)}
            src={src}
            info={t(`aboutTeam.${info}`)}
            path={path}
          />
        ))}
      </div>
    </div>
  );
}

export default WelcomePage;
