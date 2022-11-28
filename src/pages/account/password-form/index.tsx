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
  oldPassword: Yup.string()
    .required('Required')
    .min(4, 'Must be (4-15) characters')
    .max(15, 'Must be (4-15) characters'),
  newPassword: Yup.string()
    .required('Required')
    .min(4, 'Must be (4-15) characters')
    .max(15, 'Must be (4-15) characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required')
});

const PasswordForm: React.FC<PropType> = props => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      console.log(values);
    }
  });

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: '260px' }}>
            <CustomFormControl formikProps={formik} name='oldPassword' label='Old Password' type='password' />
            <CustomFormControl formikProps={formik} name='newPassword' label='New Password' type='password' />
            <CustomFormControl formikProps={formik} name='confirmPassword' label='Confirm Password' type='password' />
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

export default PasswordForm;
