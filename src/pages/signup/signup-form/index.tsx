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

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters')
    .max(15, 'Must be 15 characters or less'),
  email: Yup.string().required('Required').email('Invalid email address'),
  password: Yup.string().required('Required').min(4, 'Must be (4-15) characters').max(15, 'Must be (4-15) characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  homeAddress: Yup.string().required('Required').min(4, 'Minimum of 4 characters'),
  contactNumber: Yup.string().required('Required').min(10, 'Invalid contact number')
});

const SignUpForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      homeAddress: '',
      contactNumber: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      AuthApi.signup(values.email, values.password, values.name, values.homeAddress, values.contactNumber)
        .then(response => {
          const { userId, token, userName, type } = response.data;
          setSubmitting(false);
          login(userId, token, userName, type);
          navigate('/');
        })
        .catch(err => {
          setSubmitting(false);
          console.log(err);
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <CustomFormControl formikProps={formik} name='name' label='Name' type='text' />
        <CustomFormControl formikProps={formik} name='email' label='Email' type='text' />
        <CustomFormControl formikProps={formik} name='password' label='Password' type='password' />
        <CustomFormControl formikProps={formik} name='confirmPassword' label='Confirm Password' type='password' />
        <CustomFormControl formikProps={formik} name='homeAddress' label='Home Address' type='text' />
        <CustomFormControl formikProps={formik} name='contactNumber' label='Contact Number' type='number' />
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Sign Up
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default SignUpForm;
