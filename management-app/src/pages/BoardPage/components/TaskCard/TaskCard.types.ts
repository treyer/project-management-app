import { TTaskResponse } from '../../../../api/types';

export type TTaskCardProps = {
  index: number;
  taskInfo: TTaskResponse;
  columnId: string;
  boardId: string;
};
