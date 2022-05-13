import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BoardsAPI from '../../api/boardsAPI';
import { TBoard, TBoardBase } from '../../api/types';

type TMainState = {
  title: TBoardBase;
};

const initialState: TMainState = {
  title: {} as TBoardBase,
};

export const addBoard = createAsyncThunk(
  'main/addBoard',
  async (title: TBoardBase): Promise<TBoard> => {
    return BoardsAPI.createBoard(title, '');
  }
);

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBoard.fulfilled, (state, action) => {
      const { title } = action.payload;
      state.title = { title };
    });
  },
});

export default mainSlice.reducer;
