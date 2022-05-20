/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import boardsAPI from '../../api/boardsAPI';
import columnsAPI from '../../api/columnsAPI';
import tasksAPI from '../../api/tasksAPI';
import { TBoardResponse, TColumnBase, TTaskBase } from '../../api/types';
import { RootState, useAppSelector } from '../../store';

export const createTask = createAsyncThunk(
  'board/createTask',
  ({
    boardId,
    columnId,
    task,
  }: {
    boardId: string;
    columnId: string;
    task: TTaskBase;
  }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return tasksAPI.createTask({
        boardId,
        columnId,
        token,
        task,
      });
    }
    throw new Error();
  }
);

export const createColumn = createAsyncThunk(
  'board/createColumn',
  ({ boardId, column }: { boardId: string; column: TColumnBase }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return columnsAPI.createColumn({
        boardId,
        token,
        column,
      });
    }
    throw new Error();
  }
);

export const setColumnTitle = createAsyncThunk(
  'board/setColumnTitle',
  ({
    boardId,
    columnId,
    column: { title, order },
  }: {
    boardId: string;
    columnId: string;
    column: TColumnBase;
  }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return columnsAPI.updateColumn({
        boardId,
        columnId,
        token,
        column: { title, order },
      });
    }
    throw new Error();
  }
);

export const getBoard = createAsyncThunk('board/getBoard', (id: string) => {
  const token = localStorage.getItem('token');
  if (token) {
    return boardsAPI.getBoard(id, token);
  }
  throw new Error();
});

const initialState = {
  boardData: {} as TBoardResponse,
  isBoardLoading: false,
  isColumnTitleLoading: false,
  isNewTaskLoading: false,
  isNewColumnLoading: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // TODO: maintain rejected, pending ...
      .addCase(getBoard.fulfilled, (state, action) => {
        state.isBoardLoading = false;

        if (action.payload) {
          const { id, title, columns } = action.payload;
          state.boardData.id = id;
          state.boardData.title = title;
          state.boardData.columns = columns;
        }
      })
      .addCase(getBoard.rejected, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(getBoard.pending, (state) => {
        state.isBoardLoading = true;
      })
      .addCase(setColumnTitle.fulfilled, (state, action) => {
        state.isColumnTitleLoading = false;
        if (action.payload) {
          const { id: columnId, title } = action.payload;
          const column = state.boardData.columns.find(
            ({ id }) => id === columnId
          );
          if (column) {
            column.title = title;
          }
        }
      })
      .addCase(setColumnTitle.rejected, (state) => {
        state.isColumnTitleLoading = false;
      })
      .addCase(setColumnTitle.pending, (state) => {
        state.isColumnTitleLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isNewTaskLoading = false;
        const { title, order, description, userId, taskId, columnId } =
          action.payload;
        const column = state.boardData.columns.find(
          ({ id }) => id === columnId
        );
        if (column) {
          column.tasks.push({
            id: taskId,
            title,
            order,
            done: false,
            description,
            userId,
            files: [],
          });
        }
      })
      .addCase(createTask.rejected, (state) => {
        state.isNewTaskLoading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.isNewTaskLoading = true;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isNewColumnLoading = false;
        const { id, title, order } = action.payload;
        state.boardData.columns.push({
          id,
          title,
          order,
          tasks: [],
        });
      })
      .addCase(createColumn.rejected, (state) => {
        state.isNewColumnLoading = false;
      })
      .addCase(createColumn.pending, (state) => {
        state.isNewColumnLoading = true;
      });
  },
});

export const useBoardSelector = () => {
  useAppSelector(({ board }: RootState) => board);
};

export default boardSlice.reducer;
