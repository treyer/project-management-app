import { Dispatch, DispatchWithoutAction } from 'react';

export type TCreateColumnFieldProps = {
  createColumn: Dispatch<string>;
  onRequestClose: DispatchWithoutAction;
};
