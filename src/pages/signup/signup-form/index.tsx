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
import CustomFormControlSelect from 'src/common/custom-form-control-select';

const recoveryQuestions = [
  {
    value: 'pet',
    label: 'What is the name of your pet?'
  },
  {
    value: 'school',
    label: 'What elementary school did you attend?'
  },
  {
    value: 'hero',
    label: 'Who was your childhood hero?'
  }
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters')
    .max(15, 'Must be 15 characters or less'),
  email: Yup.string().required('Required').email('Invalid email address'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  street: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  barangay: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  region: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  province: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  city: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  contactNumber: Yup.string()
    .required('Required')
    .matches(/^\d{10}$/, 'Must be a valid phone number ex. +639123456789'),
  recoveryQuestion: Yup.string().required('Required'),
  recoveryAnswer: Yup.string().required('Required')
});

const SignUpForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      street: '',
      barangay: '',
      region: '',
      province: '',
      city: '',
      contactNumber: '',
      recoveryQuestion: '',
      recoveryAnswer: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const homeAddress = `${values.street}, ${values.barangay}, ${values.region}, ${values.province}, ${values.city}`;
      AuthApi.signup(
        values.email,
        values.password,
        values.name,
        homeAddress,
        `+63${values.contactNumber}`,
        values.recoveryQuestion,
        values.recoveryAnswer
      )
        .then(response => {
          const { userId, token, userName, type } = response.data;
          setSubmitting(false);
          enqueueSnackbar(response.data.message || 'Signup successful', { variant: 'success' });
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
        <CustomFormControl formikProps={formik} name='name' label='Name' type='text' />
        <CustomFormControl formikProps={formik} name='email' label='Email' type='text' />
        <CustomFormControl formikProps={formik} name='password' label='Password' type='password' />
        <CustomFormControl
          formikProps={formik}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          hideRevealPassword
        />
        <CustomFormControl formikProps={formik} name='street' label='House No., Building, Street Name' type='text' />
        <CustomFormControl formikProps={formik} name='barangay' label='Barangay' type='text' />
        <CustomFormControl formikProps={formik} name='region' label='Region' type='text' />
        <CustomFormControl formikProps={formik} name='province' label='Province' type='text' />
        <CustomFormControl formikProps={formik} name='city' label='City' type='text' />
        <CustomFormControl
          formikProps={formik}
          name='contactNumber'
          label='Contact Number'
          type='text'
          startAdornment='+63'
        />
        {/* <CustomFormControl
          formikProps={formik}
          name='recoveryQuestion'
          label='Select'
          type='select'
          options={recoveryQuestions}
        /> */}
        <CustomFormControlSelect
          formikProps={formik}
          name='recoveryQuestion'
          label='Select recovery question'
          options={recoveryQuestions}
        />
        <CustomFormControl formikProps={formik} name='recoveryAnswer' label='Answer' type='text' />
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Sign Up
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default SignUpForm;
