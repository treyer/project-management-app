import { StatusCodes } from 'http-status-codes';
import { TAPIErrorsMap } from './types';

export const USERS_API_ERRORS: TAPIErrorsMap = {
  [StatusCodes.UNAUTHORIZED]: 'Access token is missing or invalid.',
  [StatusCodes.NOT_FOUND]: 'User not found.',
  [StatusCodes.BAD_REQUEST]: 'Bad request.',
  [StatusCodes.FORBIDDEN]: 'Incorrect e-mail or password',

  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error.',
};
