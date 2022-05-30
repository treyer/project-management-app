import { Card, CardMedia, CardContent, Typography, Link } from '@mui/material';

import style from '../WelcomePage.module.css';

type TTeamInfoCardProps = {
  name: string;
  src: string;
  info: string;
  path: string;
};

function TeamInfoCard({ name, src, info, path }: TTeamInfoCardProps) {
  return (
    <Link
      href={path}
      target="_blank"
      rel="noreferrer"
      style={{ color: '#ffffff' }}
      underline="none"
    >
      <Card sx={{ maxWidth: 270 }} className={style.card}>
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
    </Link>
  );
}

export default TeamInfoCard;
