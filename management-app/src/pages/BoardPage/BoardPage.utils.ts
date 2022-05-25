import { TColumnResponse, TCreateTaskResponse } from '../../api/types';
import { RootState } from '../../store';

const getTasksByColumnId = (state: RootState, columnId: string) => {
  const currentColumn = state.board.boardData.columns.find(
    (column) => column.id === columnId
  );
  if (currentColumn) {
    return currentColumn;
  }
  return {} as TColumnResponse;
};

const getColumnById = (columnsToFilter: TColumnResponse[], id: string) => {
  const result = columnsToFilter.find((column) => column.id === id);
  return result;
};

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

export { getTasksByColumnId, getColumnById, getTaskById };
