import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import React from 'react';

interface PropType {
  open: boolean;
  handleClose: () => void;
  message: string;
  cancelMessage?: string;
  confirmMessage?: string;
  confirmFunction?: () => void;
}

const ConfirmationModal: React.FC<PropType> = props => {
  const confirmHandler = () => {
    props.confirmFunction?.();
    props.handleClose?.();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.message}</DialogTitle>
      <DialogActions>
        <Button variant='outlined' onClick={props.handleClose}>
          {props.cancelMessage}
        </Button>
        <Button variant='contained' type='submit' onClick={confirmHandler}>
          {props.confirmMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationModal.defaultProps = {
  cancelMessage: 'No',
  confirmMessage: 'Yes',
  confirmFunction: () => {}
};

export default ConfirmationModal;
