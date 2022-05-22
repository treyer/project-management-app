import { TColumnResponse } from '../../api/types';
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

export { getTasksByColumnId };
