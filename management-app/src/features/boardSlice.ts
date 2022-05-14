/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import boardsAPI from '../api/boardsAPI';
import columnsAPI from '../api/columnsAPI';
import { TBoardResponse, TColumnBase } from '../api/types';
import { RootState, useAppSelector } from '../store';
// TODO: uncomment when mainSlice will be ready
// export const setColumnTitle = createAsyncThunk(
//   'board/setColumnTitle',
//   ({
//     boardId,
//     columnId,
//     column: { title, order },
//   }: {
//     boardId: string;
//     columnId: string;
//     column: TColumnBase;
//   }) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       return columnsAPI.updateColumn({
//         boardId,
//         columnId,
//         token,
//         column: { title, order },
//       });
//     }
//     throw new Error();
//   }
// );
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
      return {
        id: columnId,
        title,
        order,
      };
    }
    throw new Error();
  }
);

// TODO: uncomment when mainSlice will be ready
// export const getBoard = createAsyncThunk('board/getBoard', (id: string) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     return boardsAPI.getBoard(id, token);
//   }
//   throw new Error();
// });
export const getBoard = createAsyncThunk('board/getBoard', (id: string) => {
  const token = localStorage.getItem('token');
  if (token) {
    const currentBoard = {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
      title: 'Homework tasks',
      columns: [
        {
          id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
          title: 'Done',
          order: 1,
          tasks: [
            {
              id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
              title: 'Task: pet the cat',
              order: 1,
              done: false,
              description: 'Domestic cat needs to be stroked gently',
              userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
              files: [
                {
                  filename: 'foto.jpg',
                  fileSize: 6105000,
                },
              ],
            },
          ],
        },
        {
          id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4t',
          title: 'todo',
          order: 2,
          tasks: [
            {
              id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf8',
              title: 'Task: pet the cat',
              order: 1,
              done: false,
              description: 'Domestic cat needs to be stroked gently',
              userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
              files: [
                {
                  filename: 'foto.jpg',
                  fileSize: 6105000,
                },
              ],
            },
          ],
        },
      ],
    };

    return currentBoard;
  }
  throw new Error();
});

const initialState: TBoardResponse = {} as TBoardResponse;

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, title, columns } = action.payload;
          state.id = id;
          state.title = title;
          state.columns = columns;
        }
      })
      // TODO: maintain rejected, pending ...
      .addCase(setColumnTitle.fulfilled, (state, action) => {
        if (action.payload) {
          const { id: columnId, title } = action.payload;
          const column = state.columns.find(({ id }) => id === columnId);
          if (column) {
            column.title = title;
          }
        }
      });
  },
});

export const useBoardSelector = () => useAppSelector(({ board }) => board);
// export const useColumnSelector = (columnId: string) => useAppSelector
// (({ columns }) => columns.find(column => column.id === columnId )));

export default boardSlice.reducer;
