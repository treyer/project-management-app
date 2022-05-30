import { StatusCodes } from 'http-status-codes';
import { TAPIErrorsMap } from './types';

export const USERS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Access token is missing or invalid.',
  [StatusCodes.NOT_FOUND]: 'User not found.',
  [StatusCodes.BAD_REQUEST]: 'Bad request.',
  [StatusCodes.FORBIDDEN]: 'Incorrect e-mail or password',
  [StatusCodes.CONFLICT]: 'User login already exists',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
};

export const BOARDS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Access token is missing or invalid.',
  [StatusCodes.NOT_FOUND]: 'Board not found.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
  [StatusCodes.BAD_REQUEST]: 'Validation failed (uuid  is expected)',
};

export const TASKS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Access token is missing or invalid.',
  [StatusCodes.NOT_FOUND]: 'Task not found.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
};

export const FILE_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Access token is missing or invalid.',
  [StatusCodes.NOT_FOUND]: 'File not found.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
};
