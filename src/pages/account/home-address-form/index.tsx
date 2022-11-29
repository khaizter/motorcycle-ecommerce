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

interface PropType {
  open: boolean;
  handleClose: () => void;
  refreshInfo: () => void;
}

const validationSchema = Yup.object({
  homeAddress: Yup.string().required('Required').min(4, 'Minimum of 4 characters')
});

const HomeAddressForm: React.FC<PropType> = props => {
  const { currentToken } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      homeAddress: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!currentToken) {
        console.log('No token');
        setSubmitting(false);
        return;
      }
      AuthApi.updateHomeAddress(currentToken, values.homeAddress)
        .then(response => {
          setSubmitting(false);
          console.log(response);
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
      <DialogTitle>Update Home Address</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: '260px' }}>
            <CustomFormControl formikProps={formik} name='homeAddress' label='Home Address' type='text' multiline />
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

export default HomeAddressForm;