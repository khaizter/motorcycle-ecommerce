import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';

interface propType {
  open: boolean;
  handleClose: () => void;
  confirmHandler: () => void;
}

const CheckoutModal: React.FC<propType> = props => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.open}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            Are you sure you want to checkout?
          </Typography>
          <Button variant='outlined' onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={props.confirmHandler}>
            Place Order
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CheckoutModal;
