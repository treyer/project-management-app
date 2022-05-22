/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import boardsAPI from '../../api/boardsAPI';
import columnsAPI from '../../api/columnsAPI';
import tasksAPI from '../../api/tasksAPI';
import {
  TBoardResponse,
  TColumnBase,
  TCreateTaskResponse,
  TTask,
  TTaskBase,
  TUpdateTaskRequestBody,
} from '../../api/types';
import { RootState, useAppSelector } from '../../store';

type TBoardState = {
  boardData: TBoardResponse;
  isBoardLoading: boolean;
  isColumnTitleLoading: boolean;
  isNewTaskLoading: boolean;
  isNewColumnLoading: boolean;
};
const initialState: TBoardState = {
  boardData: {} as TBoardResponse,
  isBoardLoading: false,
  isColumnTitleLoading: false,
  isNewTaskLoading: false,
  isNewColumnLoading: false,
};

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
    const token = localStorage.getItem('token') as string;
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
  ({ boardId, column }: { boardId: string; column: TColumnBase }) => {
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
    const token = localStorage.getItem('token') as string;
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
  const token = localStorage.getItem('token') as string;
  if (token) {
    return boardsAPI.getBoard(id, token);
  }
  throw new Error();
});

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
  ): Promise<TCreateTaskResponse> => {
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
        const {
          title,
          order,
          description,
          userId,
          id: taskId,
          columnId,
        } = action.payload;
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
