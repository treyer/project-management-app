import { BaseAPI } from './baseAPI';
import { USERS_API_ERRORS } from './errors';
import { TUser } from './types';

class UsersAPI extends BaseAPI {
  updateUser(
    userId: string,
    token: string,
    dataUser: TUser,
    updateUserCb: (data: TUser) => void,
    errorCb = (_error: Error) => {
      // eslint-disable-next-line no-console
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
}

export default new UsersAPI();
