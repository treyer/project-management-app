import React from 'react';
import AuthPage from './pages/AuthPage';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import { TPath } from './types';

export const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

export const ROUTES: TPath[] = [
  { id: 1, routePath: '/', title: 'Welcome', element: <WelcomePage /> },
  {
    id: 2,
    routePath: '/main',
    title: 'Main',
    element: <MainPage />,
  },
  { id: 3, routePath: '/board', title: 'Board', element: <BoardPage /> },
  { id: 4, routePath: '/auth', title: 'Auth', element: <AuthPage /> },
  { id: 5, routePath: '*', title: 'Not Found Page', element: <NotFoundPage /> },
];
