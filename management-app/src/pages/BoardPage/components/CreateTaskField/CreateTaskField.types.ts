import { Dispatch, DispatchWithoutAction } from 'react';

export type CreateTaskFieldProps = {
  createTask: Dispatch<string>;
  onRequestClose: DispatchWithoutAction;
};
