import React, { useRef } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface propType {
  open: boolean;
  handleClose: () => void;
  confirmHandler: (address: string) => void;
}

const AddressModal: React.FC<propType> = props => {
  const inputRef = useRef(null);

  const confirmHandler = () => {
    const inputValue = inputRef?.current?.['value'] || '';
    props.confirmHandler(inputValue);
  };

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
            Delivery Address
          </Typography>
          <TextField id='address' label='Address' multiline maxRows={4} inputRef={inputRef} />
          <Box>
            <Button variant='outlined' onClick={props.handleClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={confirmHandler}>
              Update
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddressModal;
