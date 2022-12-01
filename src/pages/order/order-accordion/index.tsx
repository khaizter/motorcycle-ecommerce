import {
  Accordion,
  AccordionSummary,
  Stack,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  Button,
  Box
} from '@mui/material';
import React, { useContext } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { OrderType, ItemType } from 'src/pages/order/model';
import ProductItem from 'src/pages/order/product-item';
import useModal from 'src/hooks/useModal';
import ConfirmationModal from 'src/common/confirmation-modal';
import { AuthContext } from 'src/context/auth-context';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface PropType {
  order: OrderType;
  expanded: boolean;
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const OrderAccordion: React.FC<PropType> = props => {
  const { currentUserType } = useContext(AuthContext);
  const { order } = props;
  const [openCancelConfirmation, handleOpenCancelConfirmation, handleCloseCancelConfirmation] = useModal(false);
  const [openDeleteConfirmation, handleOpenDeleteConfirmation, handleCloseDeleteConfirmation] = useModal(false);
  const [openCompleteConfirmation, handleOpenCompleteConfirmation, handleCloseCompleteConfirmation] = useModal(false);
  const subTotal = order?.items?.reduce((value, item) => value + item.quantity * item.price, 0) || 0;

  const cancelOrderHandler = () => {
    console.log('cancel order');
  };

  const deleteOrderHandler = () => {
    console.log('delete order');
  };

  const completeOrderHandler = () => {
    console.log('complete order');
  };

  return (
    <Accordion key={order.id} expanded={props.expanded} onChange={props.handleChange(order.id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', px: '8px' }}>
          <Typography>ID: {order.id}</Typography>
          <Typography>Status: {order.status}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2} sx={{ px: '8px' }}>
          <Typography>Owner : {order.owner}</Typography>
          <Typography>Delivery Address : {order.deliveryAddress}</Typography>
          <Typography>Purchased Date : {order.purchasedDate}</Typography>
        </Stack>
        <List>
          {order?.items?.map((item: ItemType, index) => {
            return <ProductItem key={index} item={item} />;
          })}
        </List>
        <Typography sx={{ textAlign: 'end', mt: '1rem' }}>Subtotal : ₱{subTotal}</Typography>
        {order.status === 'active' && currentUserType === 'customer' && (
          <Box sx={{ textAlign: 'end', mt: '1rem' }}>
            <Button
              variant='outlined'
              color='error'
              onClick={handleOpenCancelConfirmation}
              startIcon={<CancelOutlinedIcon />}
            >
              Cancel
            </Button>
            <ConfirmationModal
              open={openCancelConfirmation}
              handleClose={handleCloseCancelConfirmation}
              message='Are you sure you want to cancel this order?'
              confirmFunction={cancelOrderHandler}
            />
          </Box>
        )}
        {currentUserType === 'admin' && (
          <Box sx={{ textAlign: 'end', mt: '1rem' }}>
            <Button
              variant='outlined'
              color='error'
              onClick={handleOpenDeleteConfirmation}
              startIcon={<DeleteOutlineOutlinedIcon />}
            >
              Delete
            </Button>
            <ConfirmationModal
              open={openDeleteConfirmation}
              handleClose={handleCloseDeleteConfirmation}
              message='Are you sure you want to delete this order?'
              confirmFunction={deleteOrderHandler}
            />
            {order.status === 'active' && (
              <>
                <Button
                  variant='outlined'
                  color='success'
                  onClick={handleOpenCompleteConfirmation}
                  startIcon={<CheckCircleOutlineOutlinedIcon />}
                  sx={{ ml: '0.5rem' }}
                >
                  Complete
                </Button>
                <ConfirmationModal
                  open={openCompleteConfirmation}
                  handleClose={handleCloseCompleteConfirmation}
                  message='Are you sure you want to complete this order?'
                  confirmFunction={completeOrderHandler}
                />
              </>
            )}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderAccordion;
