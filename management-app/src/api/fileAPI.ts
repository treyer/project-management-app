import { BaseAPI } from './baseAPI';
import { FILE_API_ERRORS } from './errors';
import { TFile } from './types';

class FileAPI extends BaseAPI {
  //  @todo check during implementing uploadFile logic
  uploadFile(token: string, file: TFile): Promise<void> {
    return this.post(`file`, file, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, FILE_API_ERRORS);
      return result.json();
    });
  }
  //  @todo check during implementing downloadFile logic

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
