export type TAPIErrorsMap = {
  [key: number]: string;
};

export type TUserBase = {
  login: string;
  password: string;
};

export type TBoard = TBoardBase & {
  boardId: string;
};

export type TBoardBase = {
  title: string;
};

export type TUser = TUserBase & {
  name: string;
};

export type TColumnBase = {
  title: string;
  order: number;
};

export type TColumn = TColumnBase & {
  columnId: string;
};

export type TTaskBase = {
  title: string;
  order: number;
  description: string;
  userId: string;
};

export type TTask = TTaskBase & {
  taskId: string;
  boardId: string;
  columnId: string;
};
