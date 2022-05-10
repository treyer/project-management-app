export type TPath = {
  id: RouteID;
  routePath: string;
  title: string;
  element: JSX.Element;
};

export enum RouteID {
  Welcome,
  Main,
  Board,
  Auth,
  NotFound,
}
