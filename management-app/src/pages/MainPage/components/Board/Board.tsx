/* eslint-disable max-len */
import { useCallback, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch } from '../../../../store';
import { closeDialog, deleteBoard } from '../../slice/mainSlice';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';

type TBoardProps = {
  titleBoard: string;
  description: string;
  id: string;
  columnNum: number;
};

function Board({ titleBoard, description, id, columnNum }: TBoardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:395px)');

  const dispatch = useAppDispatch();

  const handleDeleteBoard = useCallback((event: MouseEvent) => {
    event.preventDefault();

    setDialogOpen(true);
  }, []);

  const handleDecline = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(deleteBoard(id));
    dispatch(closeDialog());
  }, [dispatch, id]);

  return (
    <>
      {isDialogOpen && (
        <ConfirmMessage
          openDialog={isDialogOpen}
          text={t('mainPage.ifDeleteBoardMessage')}
          onConfirm={handleConfirm}
          onDecline={handleDecline}
        />
      )}
      <NavLink
        to={`/boards/${id}`}
        style={{ textDecoration: 'none', position: 'relative' }}
      >
        <Card
          sx={[
            {
              width: '70vw',
              height: '200px',
              position: 'relative',
              backgroundColor: 'primary.light',
            },
            {
              '&:hover': {
                backgroundColor: 'primary.main',
              },
            },
            {
              '&:active': {
                backgroundColor: '#ffffff',
              },
            },
          ]}
        >
          <CardHeader
            sx={{
              textAlign: 'left',
              position: 'relative',
              zIndex: 10,
              color: 'text.secondary',
            }}
            action={
              <IconButton
                aria-label="delete"
                size="large"
                onClick={handleDeleteBoard}
              >
                <DeleteIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
            }
            title={titleBoard}
          />
          <CardContent sx={{ color: 'text.secondary' }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: 'left',
                position: 'relative',
                zIndex: 100,
              }}
            >
              {description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'left', position: 'absolute', bottom: '5px' }}
            >
              {`${t('mainPage.numberOfColumns')}: ${columnNum}`}
            </Typography>
          </CardContent>
        </Card>
        {matches && (
          <img
            src="./assets/svg/board.svg"
            alt="Board"
            style={{
              position: 'absolute',
              top: '20px',
              left: '15px',
              zIndex: 1,
              opacity: theme.palette.mode === 'dark' ? '0.1' : '0.3',
            }}
          />
        )}
      </NavLink>
    </>
  );
}

export default Board;
