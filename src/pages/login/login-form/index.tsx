import React from 'react';

// Material UI
import { LoadingButton } from '@mui/lab';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Common
import CustomFormControl from 'src/common/custom-form-control';
import { Stack } from '@mui/material';

const validationSchema = Yup.object({
  email: Yup.string().required('Required').email('Invalid email address'),
  password: Yup.string().required('Required')
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <CustomFormControl formikProps={formik} name='email' label='Email' type='text' />
        <CustomFormControl formikProps={formik} name='password' label='Password' type='password' />
        <LoadingButton type='submit' loading={formik.isSubmitting}>
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default LoginForm;