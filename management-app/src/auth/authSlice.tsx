/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TUserBase, TUserData } from '../api/types';
import UsersAPI from '../api/usersAPI';

type TAuthState = {
  userData: TUserData;
  user: TUser;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const initialState: TAuthState = {
  userData: {} as TUserData,
  user: {} as TUser,
  isLoading: false,
  isLoggedIn: !!localStorage.getItem('token'),
};

export const signUp = createAsyncThunk('auth/signUp', (userData: TUser) =>
  UsersAPI.createAccount(userData)
);

export const signIn = createAsyncThunk('auth/signIn', (userBase: TUserBase) =>
  UsersAPI.createToken(userBase)
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  (userData: TUser) => {
    const token = localStorage.getItem('token') as string;
    const userId = localStorage.getItem('userId') as string;
    if (token && userId) {
      return UsersAPI.updateUser(userId, token, userData);
    }
    throw new Error();
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (): Promise<TUser> => {
    const token = localStorage.getItem('token') as string;
    const userId = localStorage.getItem('userId') as string;
    const result = await UsersAPI.getUser(userId, token);
    return result;
  }
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
      localStorage.removeItem('userId');
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
        state.userData.id = action.payload.id;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userId', action.payload.id);
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { name, id, login } = action.payload;
        state.userData = { name, id, login };
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { name, password, login } = action.payload;
        state.user = { name, password, login };
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setIsLoggedIn, logOut } = authSlice.actions;
export default authSlice.reducer;
