import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Stack, TextField, Typography, Fade } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { SignInFormValues } from './SignInForm.types';
import { signInFields } from './SignInForm.utils';
import { useAppDispatch, useAppSelector } from '../../store';
import { signIn } from '../authSlice';

const initialValues: SignInFormValues = {
  login: '',
  password: '',
};

function SignInForm() {
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [signInError, setSignInError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        login: Yup.string()
          .min(2, t('signInForm.errLoginMinLength'))
          .required(t('signInForm.errLoginRequired')),
        password: Yup.string()
          .min(8, t('signInForm.errPasswordMinLength'))
          .required(t('signInForm.errPasswordRequired')),
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
    validationSchema: loginValidationSchema,
    onSubmit: ({ login, password }) => {
      dispatch(signIn({ login, password }))
        .unwrap()
        .then(() => setSignInError(''))
        .catch((e) => {
          setSignInError(
            typeof e.message === 'string'
              ? e.message
              : t('signInForm.unknownError')
          );
        });
    },
  });

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ maxWidth: 600, minWidth: 280 }}
      >
        <Typography variant="h3" gutterBottom>
          {t('signInForm.signIn')}
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
              label={t(`signInForm.${elem.label}`)}
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
            loadingIndicator={t('signInForm.loadingIndicatorText')}
          >
            {t('signInForm.signIn')}
          </LoadingButton>
        </Stack>
      </Box>
    </Stack>
  );
}

export { SignInForm };
