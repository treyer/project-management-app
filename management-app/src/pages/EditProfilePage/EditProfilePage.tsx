import React, { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Stack, TextField, Typography, Fade } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TEditProfileFormValues } from './EditProfilePage.types';
import { editProfileFormFields } from './EditProfilePage.utils.';
import { useAppDispatch, useAppSelector } from '../../store';
import { getUser, signIn, updateUser } from '../../auth/authSlice';

function EditProfilePage() {
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.auth);
  const userPassword = localStorage.getItem('password') as string;
  const userName = useAppSelector((state) => state.auth.user.name);
  const userLogin = useAppSelector((state) => state.auth.user.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const editProfileValidationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(t('editProfileForm.errNameRequired')),
        login: yup
          .string()
          .min(2, t('editProfileForm.errLoginMinLength'))
          .required(t('editProfileForm.errLoginRequired')),
        password: yup
          .string()
          .min(8, t('editProfileForm.errPasswordMinLength'))
          .required(t('editProfileForm.errPasswordRequired')),
        confirmPassword: yup
          .string()
          .oneOf(
            [yup.ref('password')],
            t('editProfileForm.errPasswordDoNotMatch')
          )
          .required(t('editProfileForm.errPasswordRequired')),
      }),
    [t]
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
    dispatch(getUser());
  }, [isLoggedIn, navigate, dispatch]);

  const initialValues: TEditProfileFormValues = useMemo(
    () => ({
      name: userName,
      login: userLogin,
      password: userPassword,
      confirmPassword: userPassword,
    }),
    [userPassword, userLogin, userName]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: editProfileValidationSchema,
    onSubmit: ({ name, login, password }) => {
      localStorage.setItem('password', password);
      dispatch(updateUser({ name, login, password }))
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
          {t('editProfileForm.editProfileText')}
        </Typography>

        <Box sx={{ m: 2 }}>
          <Fade in={!!error}>
            <Alert severity="warning">{error}</Alert>
          </Fade>
        </Box>

        <Stack spacing={2}>
          {/* TODO: create FormField component instead of mapping below */}
          {editProfileFormFields.map((elem) => (
            <TextField
              fullWidth
              variant="outlined"
              key={elem.fieldName}
              id={elem.fieldName}
              name={elem.fieldName}
              type={elem.type}
              label={initialValues[elem.fieldName]}
              value={formik.values[elem.fieldName]}
              onChange={formik.handleChange}
              error={
                formik.touched[elem.fieldName] &&
                Boolean(formik.errors[elem.fieldName])
              }
              helperText={
                formik.touched[elem.fieldName] && formik.errors[elem.fieldName]
              }
              autoComplete="off"
            />
          ))}
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            loadingIndicator={t('editProfileForm.loadingIndicator')}
          >
            {t('editProfileForm.editProfileSubmit')}
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}

export { EditProfilePage };
