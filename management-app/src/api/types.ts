export type TAPIErrorsMap = {
  [key: number]: string;
};

export type TUser = TUserBase & {
  name: string;
};

export type TUserBase = {
  login: string;
  password: string;
};

export type TBoard = TBoardBase & {
  idBoard: string;
};

export type TBoardBase = {
  title: string;
};
