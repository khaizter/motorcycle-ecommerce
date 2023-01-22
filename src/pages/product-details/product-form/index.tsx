import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import CustomFormControl from 'src/common/custom-form-control';
import { AuthContext } from 'src/context/auth-context';

import ProductApi from 'src/common/api/product';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface PropType {
  open: boolean;
  handleClose: () => void;
  refreshInfo?: () => void;
  productId: string | undefined;
  initialValues: {
    name: string;
    description: string;
    price: number;
    availableStocks: number;
  };
}
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required').min(1, 'Minimum value of 1'),
  availableStocks: Yup.number().required('Required').min(0, "Stocks can't be negative"),
  image: Yup.mixed()
    .required('A file is required')
    .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
});

const ProductForm: React.FC<PropType> = props => {
  const { currentToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: props.initialValues.name,
      description: props.initialValues.description,
      price: props.initialValues.price,
      availableStocks: props.initialValues.availableStocks,
      image: new File([''], '')
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!currentToken) {
        enqueueSnackbar('No token found', { variant: 'error' });
        setSubmitting(false);
        return;
      }
      if (!props.productId) {
        enqueueSnackbar('No Product Id', { variant: 'error' });
        setSubmitting(false);
        return;
      }
      ProductApi.updateProduct(
        currentToken,
        props.productId,
        values.name,
        values.description,
        values.price,
        values.availableStocks,
        values.image
      )
        .then(response => {
          setSubmitting(false);
          enqueueSnackbar(response.data.message || 'Product updated', { variant: 'success' });
          props.refreshInfo?.();
          props.handleClose();
        })
        .catch(err => {
          setSubmitting(false);
          enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
        });
    }
  });

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Update Stocks</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: { xs: '0', sm: '260px' } }}>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={props.handleClose}>
            Cancel
          </Button>
          <LoadingButton variant='contained' type='submit' loading={formik.isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm;
