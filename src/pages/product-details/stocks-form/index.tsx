import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
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
}

const validationSchema = Yup.object({
  availableStocks: Yup.number().required('Required').min(1, "Stocks can't be negative")
});

const StocksForm: React.FC<PropType> = props => {
  const { currentToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      availableStocks: 0
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
      ProductApi.updateProductStocks(currentToken, props.productId, +values.availableStocks)
        .then(response => {
          setSubmitting(false);
          enqueueSnackbar(response.data.message, { variant: 'success' });
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
            <CustomFormControl formikProps={formik} name='availableStocks' label='Available Stocks' type='number' />
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

export default StocksForm;
