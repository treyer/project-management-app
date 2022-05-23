import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Stack, TextField, Typography, Fade } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

import { SignUpFormValues } from './SignUpForm.types';
import { signUpFields } from './SignUpForm.utils';
import { useAppDispatch, useAppSelector } from '../../store';
import { signUp, signIn } from '../authSlice';

const registerValidationSchema = yup.object({
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

function SignUpForm() {
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues,
    validationSchema: registerValidationSchema,
    onSubmit: ({ name, login, password }) => {
      dispatch(signUp({ name, login, password }))
        .unwrap()
        .then(
          () => {
            setError('');
            return dispatch(signIn({ login, password }))
              .unwrap()
              .catch((e) => setError(e.message));
          },
          (e) => setError(e.message)
        );
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: 600 }}>
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h3" gutterBottom>
          Sign Up
        </Typography>

        <Box sx={{ m: 2 }}>
          <Fade in={!!error}>
            <Alert severity="warning">{error}</Alert>
          </Fade>
        </Box>

        <Stack spacing={2}>
          {/* TODO: create FormField component instead of mapping below */}
          {signUpFields.map((elem) => (
            <TextField
              fullWidth
              variant="outlined"
              key={elem.fieldName}
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
    </Box>
  );
}

export { SignUpForm };
