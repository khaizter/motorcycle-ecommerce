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
  name: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters')
    .max(15, 'Must be 15 characters or less'),
  email: Yup.string().required('Required').email('Invalid email address'),
  password: Yup.string().required('Required').min(4, 'Must be (4-15) characters').max(15, 'Must be (4-15) characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required')
});

const SignUpForm = () => {
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
        <CustomFormControl formikProps={formik} name='name' label='Name' type='text' />
        <CustomFormControl formikProps={formik} name='email' label='Email' type='text' />
        <CustomFormControl formikProps={formik} name='password' label='Password' type='password' />
        <CustomFormControl formikProps={formik} name='confirmPassword' label='Confirm Password' type='password' />
        <LoadingButton type='submit' loading={formik.isSubmitting}>
          Sign Up
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default SignUpForm;