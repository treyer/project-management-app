import { BaseAPI } from './baseAPI';
import { FILE_API_ERRORS, USERS_API_ERRORS } from './errors';
import { TFile } from './types';

class FileAPI extends BaseAPI {
  uploadFile(token: string, file: TFile): Promise<void> {
    return this.post(`file`, file, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, USERS_API_ERRORS);
      return result.json();
    });
  }

  downloadFile(token: string, taskId: string, fileName: string): Promise<void> {
    return this.get(`file/${taskId}/${fileName}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, FILE_API_ERRORS);
      return result.json();
    });
  }
}

export default new FileAPI();
