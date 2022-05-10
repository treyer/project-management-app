export type TAPIErrorsMap = {
  [key: number]: string;
};

export type TUserBase = {
  login: string;
  password: string;
};

export type TUser = TUserBase & {
  name: string;
};

export type TUserData = {
  id: string;
  name: string;
  login: string;
};

export type TToken = {
  token: string;
};
