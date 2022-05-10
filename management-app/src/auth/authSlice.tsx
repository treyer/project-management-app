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
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        const { name, id, login } = action.payload;
        state.userData = { name, id, login };
        state.isLoading = false;
        state.signUpError = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.signUpError = action.error as string;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.signInError = '';
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
