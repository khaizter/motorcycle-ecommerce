import React, { useContext } from 'react';

// Material UI
import { LoadingButton } from '@mui/lab';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Common
import CustomFormControl from 'src/common/custom-form-control';
import { Stack } from '@mui/material';

// Api calls
import AuthApi from 'src/common/api/auth';

// Context
import { AuthContext } from 'src/context/auth-context';

// Hooks
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

const validationSchema = Yup.object({
  email: Yup.string().required('Required').email('Invalid email address'),
  password: Yup.string().required('Required')
});

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      AuthApi.login(values.email, values.password)
        .then(response => {
          const { userId, token, userName, type } = response.data;
          setSubmitting(false);
          enqueueSnackbar(response.data.message || 'Login successful', { variant: 'success' });
          login(userId, token, userName, type);
          navigate(-1);
        })
        .catch(err => {
          setSubmitting(false);
          enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <CustomFormControl formikProps={formik} name='email' label='Email' type='text' />
        <CustomFormControl formikProps={formik} name='password' label='Password' type='password' />
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default LoginForm;
