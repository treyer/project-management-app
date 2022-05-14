import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BoardsAPI from '../../../api/boardsAPI';
import { TBoard, TBoardBase } from '../../../api/types';

type TMainState = {
  boardData: TBoard;
  isLoading: boolean;
  isDialogOpen: boolean;
};

const initialState: TMainState = {
  boardData: {} as TBoard,
  isLoading: false,
  isDialogOpen: false,
};

export const createBoard = createAsyncThunk(
  'main/createBoard',
  async (title: TBoardBase): Promise<TBoard> => {
    const token = localStorage.getItem('token') as string;
    const result = await BoardsAPI.createBoard(title, token);
    return result;
  }
);

/* TODO: write all action  */

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.fulfilled, (state, action) => {
        const { title, boardId } = action.payload;
        state.boardData = { title, boardId };
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { openDialog, closeDialog } = mainSlice.actions;
export default mainSlice.reducer;
