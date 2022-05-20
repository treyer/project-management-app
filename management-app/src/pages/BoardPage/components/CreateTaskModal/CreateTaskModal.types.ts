import { Dispatch, DispatchWithoutAction } from 'react';

export type TCreateTaskModalProps = {
  createTask: Dispatch<string>;
  onRequestClose: DispatchWithoutAction;
  isModalOpen: boolean;
};

export type TCreateTaskModalState = {
  taskTitle: string;
  taskDescription: string;
};
