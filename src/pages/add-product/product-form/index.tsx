import React from 'react';

// Material UI
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

// Formik, Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Common
import CustomFormControl from 'src/common/custom-form-control';

// Api calls
import ProductApi from 'src/common/api/product';

// Hooks
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  image: Yup.string().required('Required')
});

const ProductForm = () => {
  const navigate = useNavigate();
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
      ProductApi.addProduct(values.name, values.description, +values.price, values.image)
        .then(response => {
          navigate('/products');
          setSubmitting(false);
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
        <CustomFormControl formikProps={formik} name='description' label='Description' type='text' />
        <CustomFormControl formikProps={formik} name='price' label='Price' type='number' />
        <CustomFormControl formikProps={formik} name='image' label='Image' type='text' />
        <Button variant='contained' component='label'>
          Upload File
          <input type='file' hidden />
        </Button>
        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Submit Product
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default ProductForm;
