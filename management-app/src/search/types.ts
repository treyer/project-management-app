export type TSearchResult = {
  boardsMatch: TResultBoard[];
  columnsMatch: TResultColumn[];
  tasksMatch: TResultTask[];
};

export type TResultBoard = {
  boardId: string;
  boardTitle: string;
  isMatchTitle: boolean;
};

export type TResultColumn = {
  boardId: string;
  boardTitle: string;
  columnTitle: string;
};

export type TResultTask = {
  boardId: string;
  boardTitle: string;
  columnTitle: string;
  taskTitle: string;
  isMatchTitle: boolean;
};
