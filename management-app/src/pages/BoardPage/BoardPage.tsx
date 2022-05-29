import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useNavigate, useParams } from 'react-router-dom';
import { createColumn, getBoard, updateColumn, updateTask } from './boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

import { BoardColumn } from './components/BoardColumn';
import CreateModal from '../../components/CreateModal/CreateModal';
import { TColumnResponse } from '../../api/types';
import { getColumnById, getTaskById } from './BoardPage.utils';

export function BoardPage() {
  const { t } = useTranslation();
  const { boardId } = useParams();

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { isBoardLoading } = useAppSelector((state: RootState) => state.board);
  const { title } = useAppSelector((state: RootState) => state.board.boardData);
  const { isColumnLoading } = useAppSelector((state: RootState) => state.board);
  const [isRenderDescription, setIsRenderDescription] = useState<boolean>(true);
  const [isAddColumnFieldOpen, setIsAddColumnFieldOpen] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardId) {
      dispatch(getBoard(boardId))
        .unwrap()
        .then(() => setError(''))
        .catch((e) => {
          setError(
            typeof e.message === 'string'
              ? e.message
              : t('boardPage.unknownError')
          );
        });
    }
  }, [dispatch, boardId, t]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // TODO: find a way to store columns in the right order instead of using sort

  let columns = useAppSelector((state) => state.board.boardData.columns);
  const columnsForSort = [...columns];
  columnsForSort.sort((a, b) => {
    return a.order > b.order ? 1 : -1;
  });
  columns = [...columnsForSort];

  const addNewColumn = useCallback(
    (titleInput: string) => {
      if (boardId) {
        dispatch(
          createColumn({
            boardId,
            column: {
              title: titleInput,
            },
          })
        )
          .unwrap()
          .then(() => setError(''))
          .catch((e) => {
            setError(
              typeof e.message === 'string'
                ? e.message
                : t('boardPage.unknownError')
            );
          });
      }
      setIsAddColumnFieldOpen(false);
    },
    [boardId, dispatch, t]
  );

  const exitAddColumnField = useCallback(() => {
    setIsAddColumnFieldOpen(false);
  }, []);

  const openAddColumnField = () => {
    setIsAddColumnFieldOpen(true);
    setIsRenderDescription(false);
  };

  // TODO: find a way to get rid of 'any'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: Record<string, any>) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const column = getColumnById(columns, draggableId);

      if (boardId && column) {
        dispatch(
          updateColumn({
            boardId,
            columnId: draggableId,
            column: {
              title: column.title,
              order: destination.index + 1,
            },
          })
        );
      }
    }

    const sourceColumn = getColumnById(columns, source.droppableId);

    if (sourceColumn) {
      const draggableTask = getTaskById(sourceColumn, draggableId);

      if (boardId && draggableTask) {
        dispatch(
          updateTask({
            boardId,
            columnId: source.droppableId,
            taskId: draggableId,
            task: {
              ...draggableTask,
              order: destination.index + 1,
              boardId,
              columnId: destination.droppableId,
            },
          })
        );
      }
    }
  };

  const matches1 = useMediaQuery('(max-width:470px)');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isBoardLoading && !isColumnLoading && (
        <CircularProgress
          color="inherit"
          sx={{ position: 'fixed', top: '50%', zIndex: 2 }}
        />
      )}
      <Box
        height="calc(100vh - 130px) !important"
        sx={{
          overflowX: 'auto',
          p: 3,
          pt: 0,
          width: '100%',
          justifySelf: 'start',
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Typography
          component="p"
          sx={{
            fontSize: '30px',
            textTransform: 'uppercase',
            color: '#808080',
            paddingBottom: '15px',
          }}
        >
          {title}
        </Typography>
        <Stack spacing={2} direction={matches1 ? 'column' : 'row'}>
          {isColumnLoading ? (
            <CircularProgress
              color="inherit"
              sx={{ position: 'fixed', top: '50%', right: '50%' }}
            />
          ) : (
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  //  eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.droppableProps}
                  direction={matches1 ? 'column' : 'row'}
                  spacing={2}
                >
                  {columns.map((column: TColumnResponse) => (
                    <BoardColumn
                      key={column.id}
                      id={column.id}
                      title={column.title}
                      order={column.order}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          )}

          {!isAddColumnFieldOpen ? (
            <Button
              sx={{
                maxHeight: '100px',
                minWidth: '200px',
              }}
              onClick={openAddColumnField}
            >
              {t('boardPage.addColumnText')}
            </Button>
          ) : (
            <CreateModal
              isModalOpen={isAddColumnFieldOpen}
              titleModal={t('columnModal.titleModal')}
              inputName={t('columnModal.inputName')}
              labelName={t('columnModal.labelName')}
              btnName={t('columnModal.btnName')}
              onSubmit={addNewColumn}
              onClose={exitAddColumnField}
              isRenderDescription={isRenderDescription}
            />
          )}
        </Stack>
      </Box>
    </DragDropContext>
  );
}
