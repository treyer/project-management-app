import { SERVER_URL } from '../constants';
import { TAPIErrorsMap } from './types';

export class BaseAPI {
  url: string;

  constructor(url?: string) {
    const defaultUrl = url || SERVER_URL;

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
}
