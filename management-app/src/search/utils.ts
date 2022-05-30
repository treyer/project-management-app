import { TBoardResponse } from '../api/types';
import {
  TResultBoard,
  TResultColumn,
  TResultTask,
  TSearchResult,
} from './types';

export const searchByString = (
  searchString: string,
  boards: TBoardResponse[]
): TSearchResult => {
  const boardsMatch: Array<TResultBoard> = [];
  const columnsMatch: Array<TResultColumn> = [];
  const tasksMatch: Array<TResultTask> = [];

  const result = {
    boardsMatch,
    columnsMatch,
    tasksMatch,
  };

  boards.forEach((board) => {
    const boardId = board.id;
    const boardTitle = board.title;

    if (
      board.title.includes(searchString) ||
      board.description.includes(searchString)
    ) {
      result.boardsMatch.push({
        boardId: board.id,
        boardTitle: board.title,
        isMatchTitle: board.title.includes(searchString),
      });
    }

    if (board.columns.length > 0) {
      board.columns.forEach((column) => {
        const columnTitle = column.title;

        if (column.title.includes(searchString)) {
          result.columnsMatch.push({
            boardId,
            boardTitle,
            columnTitle,
          });
        }

        if (column.tasks.length > 0) {
          column.tasks.forEach((task) => {
            if (
              task.title.includes(searchString) ||
              task.description.includes(searchString)
            ) {
              result.tasksMatch.push({
                boardId,
                boardTitle,
                columnTitle,
                taskTitle: task.title,
                isMatchTitle: task.title.includes(searchString),
              });
            }
          });
        }
      });
    }
  });

  return result;
};
