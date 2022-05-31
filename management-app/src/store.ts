import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from './auth/authSlice';
import mainReducer from './pages/MainPage/slice/mainSlice';
import boardReducer from './pages/BoardPage/boardSlice';
import themeReducer from './themes/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    board: boardReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
