import { BaseAPI } from './baseAPI';

import { BOARDS_API_ERRORS } from './errors';
import type { TBoard, TBoardBase, TBoardResponse } from './types';

class BoardsAPI extends BaseAPI {
  createBoard(
    title: string,
    description: string,
    token: string
  ): Promise<TBoard> {
    return this.post(
      'boards',
      { title, description },
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  getBoards(token: string): Promise<TBoard[]> {
    return this.get('boards', {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  getBoard(boardId: string, token: string): Promise<TBoardResponse> {
    return this.get(`boards/${boardId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  updateBoard({
    boardId,
    token,
    board,
  }: {
    boardId: string;
    token: string;
    board: TBoardBase;
  }): Promise<TBoard> {
    return this.put(`boards/${boardId}`, board, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
      return result.json();
    });
  }

  deleteBoard(boardId: string, token: string): Promise<void> {
    return this.delete(`boards/${boardId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, BOARDS_API_ERRORS);
    });
  }
}

export default new BoardsAPI();
