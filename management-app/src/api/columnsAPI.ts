import { BaseAPI } from './baseAPI';
import { BOARDS_API_ERRORS } from './errors';
import { TColumn, TColumnBase, TColumnResponse } from './types';

class ColumnsAPI extends BaseAPI {
  createColumn({
    boardId,
    token,
    column,
  }: {
    boardId: string;
    token: string;
    column: Omit<TColumnBase, 'order'>;
  }): Promise<TColumn> {
    return this.post(`boards/${boardId}/columns`, column, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  getColumns(boardId: string, token: string): Promise<TColumn[]> {
    return this.get(`boards/${boardId}/columns`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  getColumn({
    boardId,
    columnId,
    token,
  }: {
    boardId: string;
    columnId: string;
    token: string;
  }): Promise<TColumnResponse> {
    return this.get(`boards/${boardId}/columns/${columnId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  updateColumn({
    boardId,
    columnId,
    token,
    column,
  }: {
    boardId: string;
    columnId: string;
    token: string;
    column: TColumnBase;
  }): Promise<TColumn> {
    return this.put(`boards/${boardId}/columns/${columnId}`, column, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  deleteColumn({
    boardId,
    columnId,
    token,
  }: {
    boardId: string;
    columnId: string;
    token: string;
  }): Promise<void> {
    return this.delete(`boards/${boardId}/columns/${columnId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }
}

export default new ColumnsAPI();
