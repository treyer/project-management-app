import { SignUpFormValues } from './SignUpForm.types';

const signUpFields: {
  fieldName: keyof SignUpFormValues;
  type: string;
  label: string;
}[] = [
  { fieldName: 'name', type: 'text', label: 'Name' },
  { fieldName: 'login', type: 'text', label: 'Login' },
  { fieldName: 'password', type: 'password', label: 'Password' },
  { fieldName: 'confirmPassword', type: 'password', label: 'Confirm password' },
];

export { signUpFields };
