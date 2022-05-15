export type TAPIErrorsMap = {
  [key: number]: string;
};

export type TUserBase = {
  login: string;
  password: string;
};

export type TBoard = TBoardBase & {
  id: string;
};

export type TBoardBase = {
  title: string;
};

export type TBoardResponse = {
  id: string;
  title: string;
  columns: TColumnResponse[];
};

export type TUser = TUserBase & {
  name: string;
};

export type TColumnBase = {
  title: string;
  order: number;
};

export type TColumn = TColumnBase & {
  id: string;
};

export type TFileResponse = {
  filename: string;
  fileSize: number;
};

export type TTaskResponse = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: TFileResponse[];
};

export type TColumnResponse = {
  id: string;
  title: string;
  order: number;
  tasks: TTaskResponse[];
};

export type TTaskBase = {
  title: string;
  order: number;
  description: string;
  userId: string;
};

export type TTask = TTaskBase & {
  id: string;
  boardId: string;
  columnId: string;
};

export type TFile = {
  taskId: string;
  file: string;
};

export type TUserData = {
  id: string;
  name: string;
  login: string;
};

export type TToken = {
  token: string;
};
