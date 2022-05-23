import React, { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Stack, TextField, Typography, Fade } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SignUpFormValues } from './SignUpForm.types';
import { signUpFields } from './SignUpForm.utils';
import { useAppDispatch, useAppSelector } from '../../store';
import { signUp, signIn } from '../authSlice';

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
  const { t } = useTranslation();

  const registerValidationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(t('signUpForm.errNameRequired')),
        login: yup
          .string()
          .min(2, t('signUpForm.errLoginMinLength'))
          .required(t('signUpForm.errLoginRequired')),
        password: yup
          .string()
          .min(8, t('signUpForm.errPasswordMinLength'))
          .required(t('signUpForm.errPasswordRequired')),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password')], t('signUpForm.errPasswordDoNotMatch'))
          .required(t('signUpForm.errPasswordRequired')),
      }),
    [t]
  );

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
          {t('signUpForm.signUpText')}
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
              label={t(`signUpForm.${elem.label}`)}
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
            loadingIndicator={t('signUpForm.loadingIndicator')}
          >
            {t('signUpForm.signUpText')}
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}

export { SignUpForm };
