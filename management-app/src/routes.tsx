import React from 'react';
// eslint-disable-next-line import/extensions
import { SignInForm } from './auth/SignInForm';
// eslint-disable-next-line import/extensions
import { SignUpForm } from './auth/SignUpForm';
// eslint-disable-next-line import/extensions
import { BoardPage } from './pages/BoardPage';
import EditProfile from './pages/EditProfile';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import { RouteID, TPath } from './types';

export const ROUTES: TPath[] = [
  {
    id: RouteID.Welcome,
    routePath: '/',
    title: 'Welcome',
    element: <WelcomePage />,
    isShownWhenLoggedIn: false,
  },
  {
    id: RouteID.Main,
    routePath: '/main',
    title: 'Main',
    element: <MainPage />,
    isShownWhenLoggedIn: true,
  },
  {
    id: RouteID.Board,
    routePath: '/boards/:boardId',
    title: 'Board',
    element: <BoardPage />,
    isShownWhenLoggedIn: true,
  },
  {
    id: RouteID.LogIn,
    routePath: '/login',
    title: 'Log In',
    element: <SignInForm />,
    isShownWhenLoggedIn: false,
  },
  {
    id: RouteID.SignUp,
    routePath: '/signup',
    title: 'Sign Up',
    element: <SignUpForm />,
    isShownWhenLoggedIn: false,
  },
  {
    id: RouteID.EditProfile,
    routePath: '/editprofile',
    title: 'Edit Profile',
    element: <EditProfile />,
    isShownWhenLoggedIn: true,
  },
  {
    id: RouteID.NotFound,
    routePath: '*',
    title: 'Not Found Page',
    element: <NotFoundPage />,
    isShownWhenLoggedIn: false,
  },
];
