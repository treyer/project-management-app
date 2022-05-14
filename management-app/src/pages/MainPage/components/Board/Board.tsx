import { Card, CardHeader, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Board() {
  return (
    <Card sx={{ width: 230, height: 170 }}>
      <CardHeader
        action={
          <IconButton aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>
        }
        title="Board"
      />
      <CardMedia
        component="img"
        height="70"
        image="./assets/svg/board.svg"
        alt="board"
      />
    </Card>
  );
}

export default Board;
