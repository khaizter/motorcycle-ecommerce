import { Stack } from '@mui/material';
import React from 'react';

// Material UI
import { LoadingButton } from '@mui/lab';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomFormControl from 'src/common/custom-form-control';
import CustomFormControlSelect from 'src/common/custom-form-control-select';

interface PropType {
  onNext: () => void;
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
  const formik = useFormik({
    initialValues: {
      recoveryQuestion: '',
      recoveryAnswer: ''
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
