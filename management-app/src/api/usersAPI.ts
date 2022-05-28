import { BaseAPI } from './baseAPI';
import { USERS_API_ERRORS } from './errors';
import { TUser, TUserBase, TUserData, TToken } from './types';

class UsersAPI extends BaseAPI {
  updateUser(userId: string, token: string, user: TUser): Promise<TUserData> {
    return this.put(`users/${userId}`, user, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, USERS_API_ERRORS);
      return result.json();
    });
  }

  getUser(userId: string, token: string): Promise<TUser> {
    return this.get(`users/${userId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, USERS_API_ERRORS);
      return result.json();
    });
  }

  getUsers(token: string): Promise<TUser[]> {
    return this.get('users', {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, USERS_API_ERRORS);
      return result.json();
    });
  }

  deleteUser(userId: string, token: string): Promise<void> {
    return this.delete(`users/${userId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, USERS_API_ERRORS);
    });
  }

  createToken(dataBase: TUserBase): Promise<TToken> {
    return this.post('signin', dataBase).then((result) => {
      BaseAPI.handleError(result, USERS_API_ERRORS);
      return result.json();
    });
  }

  createAccount(dataUser: TUser): Promise<TUserData> {
    return this.post('signup', dataUser).then((result) => {
      BaseAPI.handleError(result, USERS_API_ERRORS);
      return result.json();
    });
  }
}

export default new UsersAPI();
