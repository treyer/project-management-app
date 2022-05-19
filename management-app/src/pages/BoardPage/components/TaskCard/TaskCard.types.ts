import { TTaskResponse } from '../../../../api/types';

export type TTaskCardProps = {
  taskInfo: TTaskResponse;
  columnId: string;
  boardId: string;
};
