import { SignInFormValues } from './SignInForm.types';

const signInFields: {
  fieldName: keyof SignInFormValues;
  type: string;
  label: string;
}[] = [
  { fieldName: 'login', type: 'text', label: 'Login' },
  { fieldName: 'password', type: 'password', label: 'Password' },
];

export { signInFields };
