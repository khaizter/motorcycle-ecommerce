import React from 'react';

// Material UI
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Common
import CustomFormControl from 'src/common/custom-form-control';

const validationSchema = Yup.object({
  name: Yup.string().required('Reqired'),
  description: Yup.string().required('Reqired'),
  price: Yup.string().required('Reqired'),
  image: Yup.string().required('Reqired')
});

const ProductForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      image: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <CustomFormControl formikProps={formik} name='name' label='Name' type='text' />
        <CustomFormControl formikProps={formik} name='description' label='Description' type='text' />
        <CustomFormControl formikProps={formik} name='price' label='Price' type='text' />
        <CustomFormControl formikProps={formik} name='image' label='Image' type='text' />
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Submit Product
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default ProductForm;
