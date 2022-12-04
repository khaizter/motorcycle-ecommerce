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

import { useSnackbar } from 'notistack';

interface PropType {
  open: boolean;
  handleClose: () => void;
  refreshInfo: () => void;
}

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required')
});

const PasswordForm: React.FC<PropType> = props => {
  const { currentToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!currentToken) {
        enqueueSnackbar('No token found', { variant: 'error' });
        setSubmitting(false);
        return;
      }
      AuthApi.updatePassword(currentToken, values.oldPassword, values.newPassword)
        .then(response => {
          setSubmitting(false);
          enqueueSnackbar(response.data.message || 'Password updated', { variant: 'success' });
          logout();
          navigate('/login');
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
      <DialogTitle>Change Password</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: { xs: '0', sm: '260px' } }}>
            <CustomFormControl formikProps={formik} name='oldPassword' label='Old Password' type='password' />
            <CustomFormControl formikProps={formik} name='newPassword' label='New Password' type='password' />
            <CustomFormControl
              formikProps={formik}
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              hideRevealPassword
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

export default PasswordForm;
