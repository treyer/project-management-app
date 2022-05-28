import { TEditProfileFormValues } from './EditProfilePage.types';

const editProfileFormFields: {
  fieldName: keyof TEditProfileFormValues;
  type: string;
  label: string;
}[] = [
  { fieldName: 'name', type: 'text', label: 'NameLabel' },
  { fieldName: 'login', type: 'text', label: 'LoginLabel' },
  { fieldName: 'password', type: 'password', label: 'PasswordLabel' },
  {
    fieldName: 'confirmPassword',
    type: 'password',
    label: 'ConfirmPasswordLabel',
  },
];

export { editProfileFormFields };
