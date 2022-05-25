/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import boardsAPI from '../../api/boardsAPI';
import columnsAPI from '../../api/columnsAPI';
import tasksAPI from '../../api/tasksAPI';
import {
  TBoardResponse,
  TColumnBase,
  TTask,
  TTaskBase,
  TUpdateTaskRequestBody,
  TUpdateTaskResponse,
} from '../../api/types';
import { RootState, useAppSelector } from '../../store';
import { getBoards } from '../MainPage/slice/mainSlice';

type TBoardState = {
  boardData: TBoardResponse;
  isBoardLoading: boolean;
};
const initialState: TBoardState = {
  boardData: {
    id: '',
    title: '',
    description: '',
    columns: [],
  } as TBoardResponse,
  isBoardLoading: false,
};

export const getBoard = createAsyncThunk('board/getBoard', (id: string) => {
  const token = localStorage.getItem('token') as string;
  if (token) {
    return boardsAPI.getBoard(id, token);
  }
  throw new Error();
});

export const createTask = createAsyncThunk(
  'board/createTask',
  (
    {
      boardId,
      columnId,
      task,
    }: {
      boardId: string;
      columnId: string;
      task: TTaskBase;
    },
    { dispatch }
  ) => {
    const token = localStorage.getItem('token') as string;
    if (token) {
      return tasksAPI
        .createTask({
          boardId,
          columnId,
          token,
          task,
        })
        .then(() => dispatch(getBoard(boardId)));
    }
    throw new Error();
  }
);

export const getTask = createAsyncThunk(
  'board/getTask',
  async ({
    boardId,
    columnId,
    taskId,
  }: {
    boardId: string;
    columnId: string;
    taskId: string;
  }): Promise<TTask> => {
    const token = localStorage.getItem('token') as string;
    const result = await tasksAPI.getTask({
      boardId,
      columnId,
      taskId,
      token,
    });
    return result;
  }
);

export const createColumn = createAsyncThunk(
  'board/createColumn',
  ({
    boardId,
    column,
  }: {
    boardId: string;
    column: Omit<TColumnBase, 'order'>;
  }) => {
    const token = localStorage.getItem('token') as string;
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

export const updateColumn = createAsyncThunk(
  'board/updateColumn',
  (
    {
      boardId,
      columnId,
      column: { title, order },
    }: {
      boardId: string;
      columnId: string;
      column: TColumnBase;
    },
    { dispatch }
  ) => {
    const token = localStorage.getItem('token') as string;
    if (token) {
      return columnsAPI
        .updateColumn({
          boardId,
          columnId,
          token,
          column: { title, order },
        })
        .then(() => dispatch(getBoard(boardId)));
    }
    throw new Error();
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async (
    {
      boardId,
      columnId,
    }: {
      boardId: string;
      columnId: string;
    },
    { dispatch }
  ): Promise<void> => {
    const token = localStorage.getItem('token') as string;
    await columnsAPI.deleteColumn({ boardId, columnId, token });
    dispatch(getBoard(boardId));
  }
);

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async (
    {
      boardId,
      columnId,
      taskId,
      task,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
      task: TUpdateTaskRequestBody;
    },
    { dispatch }
  ): Promise<TUpdateTaskResponse> => {
    const token = localStorage.getItem('token') as string;
    const result = await tasksAPI.updateTask({
      boardId,
      columnId,
      taskId,
      task,
      token,
    });
    dispatch(getBoard(boardId));
    return result;
  }
);

export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async (
    {
      boardId,
      columnId,
      taskId,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
    },
    { dispatch }
  ): Promise<void> => {
    const token = localStorage.getItem('token') as string;
    await tasksAPI.deleteTask({ boardId, columnId, taskId, token });
    dispatch(getBoard(boardId));
  }
);

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(updateColumn.fulfilled, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(updateColumn.rejected, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(updateColumn.pending, (state) => {
        state.isBoardLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.isBoardLoading = true;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isBoardLoading = false;
        const { id, title, order } = action.payload;
        state.boardData.columns.push({
          id,
          title,
          order,
          tasks: [],
        });
      })
      .addCase(createColumn.rejected, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(createColumn.pending, (state) => {
        state.isBoardLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(deleteColumn.rejected, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isBoardLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isBoardLoading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isBoardLoading = true;
      });
  },
});

export const useBoardSelector = () => {
  useAppSelector(({ board }: RootState) => board);
};

export default boardSlice.reducer;
