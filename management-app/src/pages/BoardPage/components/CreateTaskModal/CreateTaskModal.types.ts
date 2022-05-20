import { DispatchWithoutAction } from 'react';

export type TCreateTaskModalProps = {
  createTask: (taskTitleInput: string, taskDescription: string) => void;
  onRequestClose: DispatchWithoutAction;
  isModalOpen: boolean;
};

export type TCreateTaskModalState = {
  taskTitle: string;
  taskDescription: string;
};
