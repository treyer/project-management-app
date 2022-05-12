import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Stack, TextField, Typography, Fade } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useNavigate } from 'react-router-dom';
import { SignInFormValues } from './SignInForm.types';
import { signInFields } from './SignInForm.utils';
import { useAppDispatch, useAppSelector } from '../../store';
import { signIn } from '../authSlice';

const loginValidationSchema = yup.object({
  login: yup
    .string()
    .min(2, 'Login should be of minimum 2 characters length')
    .required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const initialValues: SignInFormValues = {
  login: '',
  password: '',
};

function SignInForm() {
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [signInError, setSignInError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: ({ login, password }) => {
      dispatch(signIn({ login, password }))
        .unwrap()
        .then(() => setSignInError(''))
        .catch((e) => {
          setSignInError(
            typeof e.message === 'string' ? e.message : 'Unknown Error'
          );
        });
    },
  });

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: 600 }}>
        <Typography variant="h3" gutterBottom>
          Sign In
        </Typography>

        <Box sx={{ m: 2 }}>
          <Fade in={!!signInError}>
            <Alert severity="warning">{signInError}</Alert>
          </Fade>
        </Box>

        <Stack spacing={2}>
          {/* TODO: create FormField component instead of mapping below */}
          {signInFields.map((elem) => (
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
            Sign In
          </LoadingButton>
        </Stack>
      </Box>
    </Stack>
  );
}

export { SignInForm };
