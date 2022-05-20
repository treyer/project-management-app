import { Dispatch, DispatchWithoutAction } from 'react';

export type TCreateColumnModalProps = {
  createColumn: Dispatch<string>;
  onRequestClose: DispatchWithoutAction;
  isModalOpen: boolean;
};

export type TCreateColumnModalState = {
  columnTitle: string;
};
