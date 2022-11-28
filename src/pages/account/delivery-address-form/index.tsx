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
import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomFormControl from 'src/common/custom-form-control';

interface PropType {
  open: boolean;
  handleClose: () => void;
}

const validationSchema = Yup.object({
  deliveryAddress: Yup.string().required('Required').min(4, 'Minimum of 4 characters')
});

const DeliveryAddressForm: React.FC<PropType> = props => {
  const formik = useFormik({
    initialValues: {
      deliveryAddress: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      console.log(values);
    }
  });

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Update Delivery Address</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: '260px' }}>
            <CustomFormControl formikProps={formik} name='deliveryAddress' label='Delivery Address' type='text' />
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
