export type TFormFieldProps = {
  placeholder: string;
  fieldName: string;
  taskTitle: string;
  onChange: (value: string, fieldName: string) => void;
  isMultiline?: boolean;
};
