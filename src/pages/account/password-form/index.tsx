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
import { useNavigate } from 'react-router-dom';

interface PropType {
  open: boolean;
  handleClose: () => void;
  refreshInfo: () => void;
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
  const { currentToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!currentToken) {
        console.log('No token');
        setSubmitting(false);
        return;
      }
      AuthApi.updatePassword(currentToken, values.oldPassword, values.newPassword)
        .then(response => {
          setSubmitting(false);
          console.log(response);
          logout();
          props.refreshInfo();
          props.handleClose();
        })
        .catch(err => {
          setSubmitting(false);
          console.log(err);
        });
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
