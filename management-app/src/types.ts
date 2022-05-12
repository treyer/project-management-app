export type TPath = {
  id: RouteID;
  routePath: string;
  title: string;
  element: JSX.Element;
  isShownWhenLoggedIn: boolean;
};

export enum RouteID {
  Welcome,
  Main,
  Board,
  LogIn,
  SignUp,
  EditProfile,
  NotFound,
}
