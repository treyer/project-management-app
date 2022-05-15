import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BoardsAPI from '../../../api/boardsAPI';
import { TBoard, TBoardBase } from '../../../api/types';

type TMainState = {
  boardData: TBoard;
  boards: TBoard[];
  isLoading: boolean;
  isError: boolean;
  isDialogOpen: boolean;
  isBoardModalOpen: boolean;
};

const initialState: TMainState = {
  boardData: {} as TBoard,
  boards: [],
  isLoading: false,
  isError: false,
  isDialogOpen: false,
  isBoardModalOpen: false,
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

export const deleteBoard = createAsyncThunk(
  'main/deleteBoard',
  async (id: string, { dispatch }): Promise<void> => {
    await BoardsAPI.deleteBoard(id, token);
    dispatch(getBoards());
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
    openBoardModal: (state) => {
      state.isBoardModalOpen = true;
    },
    closeBoardModal: (state) => {
      state.isBoardModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.fulfilled, (state, action) => {
        const { title, id } = action.payload;
        state.boardData = { title, id };
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createBoard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        const boards = action.payload;
        state.boards = boards;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getBoards.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteBoard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export const { openDialog, closeDialog, openBoardModal, closeBoardModal } =
  mainSlice.actions;
export default mainSlice.reducer;
