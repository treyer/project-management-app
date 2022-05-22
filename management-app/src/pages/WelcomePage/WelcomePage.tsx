import { Card, CardMedia, CardContent, Typography } from '@mui/material';

import TeamInfoCard from './components/TeamInfoCard';
import { TEAM_INFO } from './constants';

import style from './WelcomePage.module.css';

function WelcomePage() {
  return (
    <div className={style.main}>
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
          sx={{ minWidth: '400px', maxWidth: '500px', height: '500px' }}
        >
          <CardContent>
            <Typography
              variant="h2"
              paddingTop={15}
              className={style.infoTitle}
            >
              Manage App
            </Typography>
            <Typography
              className={style.info}
              component="p"
              paddingTop={5}
              paddingBottom={8}
              fontSize={18}
              sx={{ textAlign: 'justify' }}
            >
              Managing resources, teams, deadlines or project budgets will be
              easy with all the professional Manage App features. With features
              for all project phases you can get your projects done from
              start-to-end smoothly.
            </Typography>
            <Typography
              component="p"
              fontSize={16}
              fontWeight={600}
              sx={{ textAlign: 'justify' }}
            >
              * Register to use all the features applications.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div
        className={style.containerParal}
        style={{
          backgroundImage: `url(/assets/img/london5.png)`,
        }}
      />
      <div className={style.container}>
        <Typography variant="h3" paddingTop={0}>
          Our team
        </Typography>
      </div>
      <div className={style.sectionEnd}>
        {Object.values(TEAM_INFO).map(({ name, src, info, path }) => (
          <TeamInfoCard
            key={name}
            name={name}
            src={src}
            info={info}
            path={path}
          />
        ))}
      </div>
    </div>
  );
}

export default WelcomePage;
