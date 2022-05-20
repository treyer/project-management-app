import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

import style from './WelcomePage.module.css';

function WelcomePage() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={style.main}>
      <div className={style.sectionStart}>
        <Card className={style.card}>
          <CardMedia
            component="img"
            alt="img"
            width={500}
            height={500}
            image="/assets/img/hero.png"
          />
        </Card>
        <Card className={style.card} sx={{ width: '500px', height: '500px' }}>
          <CardContent>
            <Typography variant="h2" paddingTop={15} height={100}>
              Manage App
            </Typography>
            <Typography
              component="p"
              paddingTop={5}
              paddingBottom={8}
              height={100}
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
        <Typography variant="h4" paddingTop={0}>
          Our team
        </Typography>
      </div>
      <div className={style.sectionEnd}>
        <Card sx={{ maxWidth: 300 }} className={style.card}>
          <CardMedia
            component="img"
            alt="img"
            width={200}
            height={300}
            image="/assets/img/lena.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Elena
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Some words about myself...
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300 }} className={style.card}>
          <CardMedia
            component="img"
            alt="img"
            width={200}
            height={300}
            image="/assets/img/andrey.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Andrey
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Some words about myself...
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300 }} className={style.card}>
          <CardMedia
            component="img"
            alt="img"
            width={200}
            height={300}
            image="/assets/img/marina.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Marina
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Some words about myself...
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WelcomePage;
