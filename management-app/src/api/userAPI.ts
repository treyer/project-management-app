/* eslint-disable no-console */
import { BaseAPI } from './baseAPI';
import { USERS_API_ERRORS } from './errors';
import { TUser, TUserBase } from './types';

class UsersAPI extends BaseAPI {
  updateUser(
    userId: string,
    token: string,
    dataUser: TUser,
    updateUserCb: (data: TUser) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    }
  ) {
    this.put(`users/${userId}`, dataUser, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => updateUserCb(result))
      .catch((error) => errorCb(error));
  }

  getUser(
    userId: string,
    token: string,
    getUserCb: (data: TUser) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    }
  ) {
    this.get(`users/${userId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => getUserCb(result))
      .catch((error) => errorCb(error));
  }

  getUsers(
    token: string,
    getUserCb: (data: TUser[]) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    }
  ) {
    this.get('users', {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => getUserCb(result))
      .catch((error) => errorCb(error));
  }

  deleteUser(
    userId: string,
    token: string,
    deleteUserCb: (id: string) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    }
  ) {
    this.delete(`users/${userId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
      })
      .then(() => deleteUserCb(userId))
      .catch((error) => errorCb(error));
  }

  createToken(
    dataBase: TUserBase,
    createTokenCb: (data: TUserBase) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    }
  ) {
    this.post('signin', dataBase)
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => createTokenCb(result))
      .catch((error) => errorCb(error));
  }

  createAccount(
    dataUser: TUser,
    createTokenCb: (data: TUser) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    }
  ) {
    this.post('signup', dataUser)
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => createTokenCb(result))
      .catch((error) => errorCb(error));
  }
}

export default new UsersAPI();
