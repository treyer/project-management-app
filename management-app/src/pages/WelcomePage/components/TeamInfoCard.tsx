import { Card, CardMedia, CardContent, Typography } from '@mui/material';

import style from '../WelcomePage.module.css';

type TTeamInfoCardProps = {
  name: string;
  src: string;
  info: string;
};

function TeamInfoCard({ name, src, info }: TTeamInfoCardProps) {
  return (
    <Card sx={{ maxWidth: 300 }} className={style.card}>
      <CardMedia
        component="img"
        alt="img"
        width={200}
        height={300}
        image={src}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TeamInfoCard;
