import { Dispatch } from 'react';

export type TFormFieldProps = {
  placeholder: string;
  fieldName: string;
  taskTitle: string;
  onChange: Dispatch<string, string>;
  isMultiline?: boolean;
};
