import { SignInFormValues } from './SignInForm.types';

const signInFields: {
  fieldName: keyof SignInFormValues;
  type: string;
  label: string;
}[] = [
  { fieldName: 'login', type: 'text', label: 'LoginLabel' },
  { fieldName: 'password', type: 'password', label: 'PasswordLabel' },
];

export { signInFields };
