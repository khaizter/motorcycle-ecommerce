import { Stack } from '@mui/material';
import React from 'react';

// Material UI
import { LoadingButton } from '@mui/lab';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomFormControl from 'src/common/custom-form-control';

// Api calls
import AuthApi from 'src/common/api/auth';

import { useSnackbar } from 'notistack';

interface ResetData {
  userId: string | null;
  token: string | null;
}

interface PropType {
  onNext: (data?: any) => void;
  resetData: ResetData;
}

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required')
});

const Level2: React.FC<PropType> = props => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
      props.onNext();
      if (!props?.resetData?.token) {
        enqueueSnackbar('Incomplete reset data', { variant: 'error' });
        return;
      }
      AuthApi.resetPassword(props.resetData.token, values.newPassword)
        .then(response => {
          console.log(response);
          setSubmitting(false);
          enqueueSnackbar(response?.data?.message, { variant: 'success' });
          props.onNext();
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
        <CustomFormControl formikProps={formik} name='newPassword' label='New Password' type='password' />
        <CustomFormControl
          formikProps={formik}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          hideRevealPassword
        />
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Reset
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Level2;
