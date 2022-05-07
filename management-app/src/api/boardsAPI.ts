/* eslint-disable no-console */
import { BaseAPI } from './baseAPI';
import { BOARDS_API_ERRORS } from './errors';
import { TBoard, TBoardBase } from './types';

class BoardsAPI extends BaseAPI {
  createBoard(
    title: TBoardBase,
    token: string,
    createBoardCb: (data: TBoard) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    }
  ) {
    this.post('boards', title, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, BOARDS_API_ERRORS);
        return result.json();
      })
      .then((result) => createBoardCb(result))
      .catch((error) => errorCb(error));
  }
}

export default new BoardsAPI();
