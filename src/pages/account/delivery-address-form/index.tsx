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
  deliveryAddress: Yup.string().required('Required').min(4, 'Minimum of 4 characters')
});

const DeliveryAddressForm: React.FC<PropType> = props => {
  const { currentToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      deliveryAddress: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!currentToken) {
        enqueueSnackbar('No token found', { variant: 'error' });
        setSubmitting(false);
        return;
      }
      AuthApi.updateDeliveryAddress(currentToken, values.deliveryAddress)
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
          <Stack spacing={2} sx={{ minWidth: '260px' }}>
            <CustomFormControl
              formikProps={formik}
              name='deliveryAddress'
              label='Delivery Address'
              type='text'
              multiline
            />
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
