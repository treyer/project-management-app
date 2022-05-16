import { Dispatch, DispatchWithoutAction } from 'react';

export type TCreateTaskFieldProps = {
  createTask: Dispatch<string>;
  onRequestClose: DispatchWithoutAction;
};
