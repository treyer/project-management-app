import React from 'react';
import AuthPage from './pages/AuthPage';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import { RouteID, TPath } from './types';

export const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

export const ROUTES: TPath[] = [
  {
    id: RouteID.Welcome,
    routePath: '/',
    title: 'Welcome',
    element: <WelcomePage />,
  },
  {
    id: RouteID.Main,
    routePath: '/main',
    title: 'Main',
    element: <MainPage />,
  },
  {
    id: RouteID.Board,
    routePath: '/board',
    title: 'Board',
    element: <BoardPage />,
  },
  {
    id: RouteID.Auth,
    routePath: '/auth',
    title: 'Auth',
    element: <AuthPage />,
  },
  {
    id: RouteID.NotFound,
    routePath: '*',
    title: 'Not Found Page',
    element: <NotFoundPage />,
  },
];
