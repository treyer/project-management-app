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
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  createColumn,
  getBoard,
  updateColumn,
  updateColumnsLocally,
  updateTask,
  updateTasksLocally,
} from './boardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

import { BoardColumn } from './components/BoardColumn';
import CreateModal from '../../components/CreateModal/CreateModal';
import { TColumnResponse } from '../../api/types';
import {
  getColumnById,
  getFullTaskInfoById,
  getTaskById,
} from './BoardPage.utils';
import { comparator, reorder } from '../../utils';

export function BoardPage() {
  const { t } = useTranslation();
  const { boardId } = useParams();
  const theme = useTheme();

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

  const columns = useAppSelector((state) =>
    [...state.board.boardData.columns].sort(comparator)
  );

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

  const onDragEnd = (result: DropResult) => {
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
        const localColumns = reorder(columns, {
          removeIndex: source.index,
          insertIndex: destination.index,
          valueToInsert: column,
        });
        dispatch(updateColumnsLocally(localColumns));

        dispatch(
          updateColumn({
            boardId,
            columnId: column.id,
            column: {
              title: column.title,
              order: destination.index + 1,
            },
          })
        );
      }
    }

    if (type === 'task') {
      const sourceColumn = getColumnById(columns, source.droppableId);
      const destinationColumn = getColumnById(columns, destination.droppableId);

      if (!sourceColumn || !destinationColumn || !boardId) {
        return;
      }

      const draggableTask = getTaskById(sourceColumn, draggableId);
      if (!draggableTask) {
        return;
      }

      const taskFullInfo = getFullTaskInfoById(sourceColumn, draggableId);
      const sourceTasks = [...sourceColumn.tasks].sort(comparator);

      if (destinationColumn.id === sourceColumn.id) {
        const localSourceTasks = reorder(sourceTasks, {
          removeIndex: source.index,
          insertIndex: destination.index,
          valueToInsert: taskFullInfo,
        });

        dispatch(
          updateTasksLocally({
            columnId: sourceColumn.id,
            tasks: localSourceTasks,
          })
        );
      } else {
        const destinationTasks = destinationColumn.tasks;

        const localSourceTasks = reorder(sourceTasks, {
          removeIndex: source.index,
        });

        const localDestinationTasks = reorder(destinationTasks, {
          insertIndex: destination.index,
          valueToInsert: taskFullInfo,
        });

        dispatch(
          updateTasksLocally({
            columnId: sourceColumn.id,
            tasks: localSourceTasks,
          })
        );

        dispatch(
          updateTasksLocally({
            columnId: destinationColumn.id,
            tasks: localDestinationTasks,
          })
        );
      }

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
              sx={{
                position: 'fixed',
                top: '50%',
                right: '50%',
              }}
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
                backgroundColor:
                  theme.palette.mode === 'dark' ? '#61dafb' : 'primary.light',
                color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? '#ffffff'
                      : 'secondary.light',
                },
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
