import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useContext } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomFormControl from 'src/common/custom-form-control';
import AuthApi from 'src/common/api/auth';
import { AuthContext } from 'src/context/auth-context';

import { useSnackbar } from 'notistack';

interface PropType {
  open: boolean;
  handleClose: () => void;
  refreshInfo: () => void;
}

const validationSchema = Yup.object({
  street: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  barangay: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  region: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  province: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  city: Yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  postal: Yup.string()
    .required('Required')
    .matches(/^\d{4}$/, 'Must be a valid postal code')
});

const DeliveryAddressForm: React.FC<PropType> = props => {
  const { currentToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      street: '',
      barangay: '',
      region: '',
      province: '',
      city: '',
      postal: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!currentToken) {
        enqueueSnackbar('No token found', { variant: 'error' });
        setSubmitting(false);
        return;
      }
      const deliveryAddress = `${values.street}, ${values.barangay}, ${values.region}, ${values.province}, ${values.city}, ${values.postal}`;
      AuthApi.updateDeliveryAddress(currentToken, deliveryAddress)
        .then(response => {
          setSubmitting(false);
          enqueueSnackbar(response.data.message || 'Delivery address updated', { variant: 'success' });
          props.refreshInfo();
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
      <DialogTitle>Update Delivery Address</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: { xs: '0', sm: '260px' } }}>
            <CustomFormControl
              formikProps={formik}
              name='street'
              label='House No., Building, Street Name'
              type='text'
            />
            <CustomFormControl formikProps={formik} name='barangay' label='Barangay' type='text' />
            <CustomFormControl formikProps={formik} name='region' label='Region' type='text' />
            <CustomFormControl formikProps={formik} name='province' label='Province' type='text' />
            <CustomFormControl formikProps={formik} name='city' label='City' type='text' />
            <CustomFormControl formikProps={formik} name='postal' label='Postal Code' type='text' />
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

export default DeliveryAddressForm;
