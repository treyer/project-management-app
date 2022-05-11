import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Box, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// import { useNavigate } from 'react-router-dom';
import { SignUpFormValues } from './SignUpForm.types';
import { signUpFields } from './SignUpForm.utils';
import { useAppDispatch, useAppSelector } from '../store';
import { signUp, signIn } from './authSlice';

const RegisterValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  login: yup
    .string()
    .min(2, 'Login should be of minimum 2 characters length')
    .required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
    .required('Password is required'),
});

const initialValues: SignUpFormValues = {
  name: '',
  login: '',
  password: '',
  confirmPassword: '',
};

export function SignUpForm() {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn]);

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterValidationSchema,
    onSubmit: ({ name, login, password }) => {
      dispatch(signUp({ name, login, password })).then(
        () => dispatch(signIn({ login, password })),
        // eslint-disable-next-line no-console
        (e) => console.error(e)
      );
    },
  });

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ Width: 600 }}>
        <Typography variant="h3" gutterBottom>
          Sign Up
        </Typography>
        <Stack spacing={2}>
          {/* TODO: create FormField component instead of mapping below */}
          {signUpFields.map((elem) => (
            <TextField
              fullWidth
              variant="outlined"
              id={elem.fieldName}
              name={elem.fieldName}
              type={elem.type}
              label={elem.label}
              value={formik.values[elem.fieldName]}
              onChange={formik.handleChange}
              error={
                formik.touched[elem.fieldName] &&
                Boolean(formik.errors[elem.fieldName])
              }
              helperText={
                formik.touched[elem.fieldName] && formik.errors[elem.fieldName]
              }
            />
          ))}
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            loadingIndicator="...Loading"
          >
            Sign Up
          </LoadingButton>
        </Stack>
      </Box>
    </Stack>
  );
}
