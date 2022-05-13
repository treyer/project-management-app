import { BaseAPI } from './baseAPI';

import { BOARDS_API_ERRORS } from './errors';
import { TAPIErrorsMap, TBoard, TBoardBase } from './types';

class BoardsAPI {
  url: string;

  constructor(url?: string) {
    const defaultUrl = process.env.REACT_APP_SERVER_URL || '';

    if (!defaultUrl) {
      throw new Error('URL for BE service is not provided!');
    }
    this.url = defaultUrl;
  }

  get(route: string, headers: { [key: string]: string } = {}) {
    return fetch(`${this.url}/${route}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    });
  }

  post(route: string, body = {}, headers: { [key: string]: string } = {}) {
    return fetch(`${this.url}/${route}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  put(route: string, body = {}, headers: { [key: string]: string } = {}) {
    return fetch(`${this.url}/${route}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  delete(route: string, headers: { [key: string]: string } = {}) {
    return fetch(`${this.url}/${route}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    });
  }

  static handleError(result: Response, errorsMap: TAPIErrorsMap) {
    if (result.ok) {
      return;
    }
    const { status } = result;
    throw new Error(errorsMap[status] || 'Unknown error!');
  }

  createBoard(title: TBoardBase, token: string): Promise<TBoard> {
    return this.post('boards', title, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
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

  getBoard(boardId: string, token: string): Promise<TBoard> {
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
