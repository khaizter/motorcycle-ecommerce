import { Button, Stack, TextField } from '@mui/material';
import React from 'react';

// Material UI
import { LoadingButton } from '@mui/lab';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomFormControl from 'src/common/custom-form-control';

interface PropType {
  onNext: () => void;
}

const validationSchema = Yup.object({
  email: Yup.string().required('Required').email('Invalid email address')
});

const Level0: React.FC<PropType> = props => {
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
      props.onNext();
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
