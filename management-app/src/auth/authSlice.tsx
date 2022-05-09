import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TUserBase, TUserData } from '../api/types';
import UsersAPI from '../api/usersAPI';

type TAuthState = {
  userData: TUserData;
  token: string;
  signInError: string;
  signUpError: string;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const initialState: TAuthState = {
  userData: {} as TUserData,
  token: '',
  signInError: '',
  signUpError: '',
  isLoading: false,
  isLoggedIn: false,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: TUser): Promise<TUserData> => {
    return UsersAPI.createAccount(userData);
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userBase: TUserBase) => {
    return UsersAPI.createToken(userBase);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        const { name, id, login } = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.userData = { name, id, login };
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.signUpError = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.signUpError = action.error as string;
      })
      .addCase(signUp.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.token = action.payload.token;
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.isLoggedIn = true;
        // eslint-disable-next-line no-param-reassign
        state.signInError = '';
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
