import { Button, Stack, TextField } from '@mui/material';
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
  email: Yup.string().required('Required').email('Invalid email address')
});

const Level0: React.FC<PropType> = props => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      AuthApi.checkEmail(values.email)
        .then(response => {
          setSubmitting(false);
          enqueueSnackbar(response?.data?.message, { variant: 'success' });
          props.onNext({ userId: response?.data?.userId });
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
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Next
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Level0;
