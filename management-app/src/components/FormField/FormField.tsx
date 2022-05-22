import { TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { TFormFieldProps } from './FormField.types';

export function FormField({
  placeholder,
  fieldName,
  taskTitle,
  onChange,
  isMultiline,
}: TFormFieldProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, fieldName);
  };
  return (
    <div>
      <Typography component="p" gutterBottom sx={{ mt: 2 }}>
        {fieldName}
      </Typography>
      <TextField
        multiline={isMultiline}
        fullWidth
        name={fieldName}
        placeholder={placeholder}
        value={taskTitle}
        onChange={handleOnChange}
      />
    </div>
  );
}
