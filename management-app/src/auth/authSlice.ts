/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TUserBase, TUserData } from '../api/types';
import UsersAPI from '../api/usersAPI';

type TAuthState = {
  userData: TUserData;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const initialState: TAuthState = {
  userData: {} as TUserData,
  isLoading: false,
  isLoggedIn: !!localStorage.getItem('token'),
};

export const signUp = createAsyncThunk('auth/signUp', (userData: TUser) =>
  UsersAPI.createAccount(userData)
);

export const signIn = createAsyncThunk('auth/signIn', (userBase: TUserBase) =>
  UsersAPI.createToken(userBase)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userData = {} as TUserData;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        const { name, id, login } = action.payload;
        state.userData = { name, id, login };
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setIsLoggedIn, logOut } = authSlice.actions;
export default authSlice.reducer;
