import { BaseAPI } from './baseAPI';
import { TASKS_API_ERRORS } from './errors';
import { TTask, TTaskBase } from './types';

class TasksAPI extends BaseAPI {
  createTask(
    boardId: string,
    columnId: string,
    token: string,
    task: TTaskBase
  ): Promise<TTask> {
    return this.post(`boards/${boardId}/columns/${columnId}/tasks`, task, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, TASKS_API_ERRORS);
      return result.json();
    });
  }

  getTasks(boardId: string, columnId: string, token: string): Promise<TTask[]> {
    return this.get(`boards/${boardId}/columns/${columnId}/tasks`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, TASKS_API_ERRORS);
      return result.json();
    });
  }

  getTask(
    boardId: string,
    columnId: string,
    taskId: string,
    token: string
  ): Promise<TTask> {
    return this.get(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, TASKS_API_ERRORS);
      return result.json();
    });
  }

  deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
    token: string
  ): Promise<TTask> {
    return this.delete(
      `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((result) => {
      BaseAPI.handleError(result, TASKS_API_ERRORS);
      return result.json();
    });
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    token: string
  ): Promise<TTask> {
    return this.put(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      Authorization: `Bearer ${token}`,
    }).then((result) => {
      BaseAPI.handleError(result, TASKS_API_ERRORS);
      return result.json();
    });
  }
}

export default new TasksAPI();
