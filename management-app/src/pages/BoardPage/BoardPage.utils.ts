import {
  TColumnResponse,
  TCreateTaskResponse,
  TFileResponse,
  TTaskResponse,
} from '../../api/types';
import { RootState } from '../../store';

const getTasksByColumnId = (state: RootState, columnId: string) => {
  const column = state.board.boardData.columns.find(
    ({ id }) => id === columnId
  );
  return column?.tasks ?? [];
};

const getColumnById = (columns: TColumnResponse[], id: string) =>
  columns.find((column) => column.id === id);

const getTaskById = (
  column: TColumnResponse,
  id: string
): Omit<TCreateTaskResponse, 'id'> => {
  const task = column.tasks.find((columnTask) => columnTask.id === id);
  if (task) {
    const resultTask = {
      title: task.title,
      description: task.description,
      userId: task.userId,
    };
    return resultTask;
  }
  return {
    title: '',
    description: '',
    userId: '',
  } as TCreateTaskResponse;
};

const getFullTaskInfoById = (column: TColumnResponse, id: string) => {
  const task = column.tasks.find((columnTask) => columnTask.id === id);
  if (task) {
    const resultTask = {
      id: task.id,
      title: task.title,
      order: task.order,
      done: task.done,
      description: task.description,
      userId: task.userId,
      files: [] as TFileResponse[],
    };
    return resultTask;
  }
  return {
    id: '',
    title: '',
    order: 0,
    done: false,
    description: '',
    userId: '',
    files: [] as TFileResponse[],
  } as TTaskResponse;
};

export { getTasksByColumnId, getColumnById, getTaskById, getFullTaskInfoById };
