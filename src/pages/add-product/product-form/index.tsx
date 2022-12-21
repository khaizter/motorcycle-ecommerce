import React, { useContext, ReactHTML } from 'react';

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
import { Box, Typography } from '@mui/material';
import { AuthContext } from 'src/context/auth-context';

import { useSnackbar } from 'notistack';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  availableStocks: Yup.string().required('Required'),
  image: Yup.mixed()
    .required('A file is required')
    .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
});

const ProductForm = () => {
  const navigate = useNavigate();
  const { currentToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      availableStocks: 0,
      image: new File([''], '')
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!currentToken) {
        enqueueSnackbar('No token found', { variant: 'error' });
        return;
      }
      ProductApi.addProduct(
        currentToken,
        values.name,
        values.description,
        values.price,
        values.availableStocks,
        values.image
      )
        .then(response => {
          navigate('/products');
          setSubmitting(false);
          enqueueSnackbar(response.data.message || 'Product added', { variant: 'success' });
        })
        .catch(err => {
          setSubmitting(false);
          enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
        });
    }
  });

  console.log(formik.errors.image);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <CustomFormControl formikProps={formik} name='name' label='Name' type='text' />
        <CustomFormControl formikProps={formik} name='description' label='Description' type='text' />
        <CustomFormControl formikProps={formik} name='price' label='Price' type='number' />
        <CustomFormControl formikProps={formik} name='availableStocks' label='Available Stocks' type='number' />
        <Stack direction='row' spacing={2} alignItems='center'>
          <Button variant='contained' component='label'>
            Upload File
            <input
              type='file'
              hidden
              name='image'
              accept='image/png, image/jpeg'
              onChange={(event: any) => {
                formik.setFieldValue('image', event?.currentTarget?.files[0]);
              }}
            />
          </Button>
          <Typography component='span'>{formik.values.image.name || 'No image'}</Typography>
        </Stack>
        {formik?.errors?.image && (
          <Typography variant='body1' color='error' sx={{ ml: '14px !important', fontSize: '12px' }}>
            {formik.errors.image.toString()}
          </Typography>
        )}

        <LoadingButton type='submit' variant='contained' size='large' loading={formik.isSubmitting}>
          Submit Product
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default ProductForm;
