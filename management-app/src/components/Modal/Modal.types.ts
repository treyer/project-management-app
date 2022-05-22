import { DispatchWithoutAction, ReactNode } from 'react';

export type TModalProps = {
  show: boolean;
  onRequestClose: DispatchWithoutAction;
  children: ReactNode;
};

export type TModalState = {
  content?: ReactNode;
};
