import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BoardsAPI from '../../../api/boardsAPI';
import { TBoard, TBoardBase, TBoardResponse } from '../../../api/types';

type TMainState = {
  boardData: TBoard;
  boards: TBoardResponse[];
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
  async (): Promise<TBoardResponse[]> => {
    const result = await BoardsAPI.getBoards(token);
    const resultAll = await Promise.all(
      result.map(({ id }) => BoardsAPI.getBoard(id, token))
    );
    return resultAll;
  }
);

export const deleteBoard = createAsyncThunk(
  'main/deleteBoard',
  async (id: string, { dispatch }): Promise<void> => {
    await BoardsAPI.deleteBoard(id, token);
    dispatch(getBoards());
  }
);

export const getBoard = createAsyncThunk(
  'main/getBoard',
  async (id: string): Promise<TBoardResponse> => {
    const result = await BoardsAPI.getBoard(id, token);
    return result;
  }
);

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
