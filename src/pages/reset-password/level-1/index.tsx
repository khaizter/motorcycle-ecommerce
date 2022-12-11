import { Stack } from '@mui/material';
import React from 'react';

// Material UI
import { LoadingButton } from '@mui/lab';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomFormControl from 'src/common/custom-form-control';
import CustomFormControlSelect from 'src/common/custom-form-control-select';

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
  recoveryQuestion: Yup.string().required('Required'),
  recoveryAnswer: Yup.string().required('Required')
});

const Level1: React.FC<PropType> = props => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      recoveryQuestion: '',
      recoveryAnswer: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!props?.resetData?.userId) {
        enqueueSnackbar('Incomplete reset data', { variant: 'error' });
        return;
      }
      AuthApi.checkRecovery(props.resetData.userId, values.recoveryQuestion, values.recoveryAnswer)
        .then(response => {
          setSubmitting(false);
          enqueueSnackbar(response?.data?.message, { variant: 'success' });
          props.onNext({ token: response?.data?.token });
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
        <CustomFormControlSelect
          formikProps={formik}
          name='recoveryQuestion'
          label='Select recovery question'
          options={recoveryQuestions}
        />
        <CustomFormControl formikProps={formik} name='recoveryAnswer' label='Answer' type='text' />
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Next
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Level1;
