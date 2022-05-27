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
import { useAppDispatch } from '../../../../store';
import { closeDialog, deleteBoard } from '../../slice/mainSlice';
import ConfirmMessage from '../../../../components/ConfirmMessage/ConfirmMessage';

type TBoardProps = {
  titleBoard: string;
  id: string;
  columnNum: number;
};

function Board({ titleBoard, id, columnNum }: TBoardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();

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
      <NavLink to={`/boards/${id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={[
            {
              width: '70vw',
              height: '200px',
              backgroundImage: 'url(./assets/svg/board.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom',
              backgroundPositionX: 'left',
              position: 'relative',
            },
            {
              '&:hover': {
                backgroundColor: '#e5eff8',
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
            sx={{ textAlign: 'left' }}
            action={
              <IconButton
                aria-label="delete"
                size="large"
                onClick={handleDeleteBoard}
              >
                <DeleteIcon />
              </IconButton>
            }
            title={titleBoard}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'left', position: 'absolute', bottom: '5px' }}
            >
              {`${t('mainPage.numberOfColumns')}: ${columnNum}`}
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
    </>
  );
}

export default Board;
