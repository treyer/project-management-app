import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BoardsAPI from '../../../api/boardsAPI';
import { TBoard, TBoardBase } from '../../../api/types';

type TMainState = {
  boardData: TBoard;
  boards: TBoard[];
  isLoading: boolean;
  isDialogOpen: boolean;
};

const initialState: TMainState = {
  boardData: {} as TBoard,
  boards: [],
  isLoading: false,
  isDialogOpen: false,
};

const token = localStorage.getItem('token') as string;

export const createBoard = createAsyncThunk(
  'main/createBoard',
  async (title: TBoardBase, { dispatch }): Promise<TBoard> => {
    const result = await BoardsAPI.createBoard(title, token);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(openDialog());
    return result;
  }
);

export const getBoards = createAsyncThunk(
  'main/getBoards',
  async (): Promise<TBoard[]> => {
    const result = await BoardsAPI.getBoards(token);
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
        const { title, id } = action.payload;
        state.boardData = { title, id };
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        const boards = action.payload;
        state.boards = boards;
      });
  },
});

export const { openDialog, closeDialog } = mainSlice.actions;
export default mainSlice.reducer;
