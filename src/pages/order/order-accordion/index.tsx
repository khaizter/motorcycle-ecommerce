import {
  Accordion,
  AccordionSummary,
  Stack,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import React, { useContext, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { OrderType, ItemType } from 'src/pages/order/model';
import ProductItem from 'src/pages/order/product-item';
import useModal from 'src/hooks/useModal';
import ConfirmationModal from 'src/common/confirmation-modal';
import { AuthContext } from 'src/context/auth-context';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import OrderApi from 'src/common/api/order';
import { toCurrency } from 'src/utils/util';

import { useSnackbar } from 'notistack';

interface PropType {
  order: OrderType;
  expanded: boolean;
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  refreshOrders: () => void;
}

const OrderAccordion: React.FC<PropType> = props => {
  const { currentUserType, currentToken } = useContext(AuthContext);
  const { order } = props;
  const [openCancelConfirmation, handleOpenCancelConfirmation, handleCloseCancelConfirmation] = useModal(false);
  const [openExpireConfirmation, handleOpenExpireConfirmation, handleCloseExpireConfirmation] = useModal(false);
  const [openCompleteConfirmation, handleOpenCompleteConfirmation, handleCloseCompleteConfirmation] = useModal(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const subTotal = order?.items?.reduce((value, item) => value + item.quantity * item.price, 0) || 0;

  const cancelOrderHandler = () => {
    if (!currentToken) {
      enqueueSnackbar('Invalid token', { variant: 'error' });
      return;
    }
    setLoadingStatus(true);
    OrderApi.cancelOrder(currentToken, order.id)
      .then(response => {
        props.refreshOrders();
        setLoadingStatus(false);
        enqueueSnackbar(response.data.message || 'Order canceled', { variant: 'success' });
      })
      .catch(err => {
        setLoadingStatus(false);
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  const deleteOrderHandler = () => {
    if (!currentToken) {
      enqueueSnackbar('Invalid token', { variant: 'error' });
      return;
    }
    setLoadingStatus(true);
    OrderApi.deleteOrder(currentToken, order.id)
      .then(response => {
        props.refreshOrders();
        setLoadingStatus(false);
        enqueueSnackbar(response.data.message || 'Order deleted', { variant: 'success' });
      })
      .catch(err => {
        setLoadingStatus(false);
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  const expireOrderHandler = () => {
    if (!currentToken) {
      enqueueSnackbar('Invalid token', { variant: 'error' });
      return;
    }
    setLoadingStatus(true);
    OrderApi.expireOrder(currentToken, order.id)
      .then(response => {
        props.refreshOrders();
        setLoadingStatus(false);
        enqueueSnackbar(response.data.message || 'Order expired', { variant: 'success' });
      })
      .catch(err => {
        setLoadingStatus(false);
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  const completeOrderHandler = () => {
    if (!currentToken) {
      enqueueSnackbar('Invalid token', { variant: 'error' });
      return;
    }
    setLoadingStatus(true);
    OrderApi.completeOrder(currentToken, order.id)
      .then(response => {
        props.refreshOrders();
        setLoadingStatus(false);
        enqueueSnackbar(response.data.message || 'Order completed', { variant: 'success' });
      })
      .catch(err => {
        setLoadingStatus(false);
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  return (
    <Accordion key={order.id} expanded={props.expanded} onChange={props.handleChange(order.id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', px: '8px' }}>
          <Typography sx={{ fontWeight: '700' }}>Order ID: {order.id}</Typography>
          {loadingStatus ? (
            <CircularProgress sx={{ display: { xs: 'none', sm: 'block' } }} />
          ) : (
            <Typography sx={{ fontWeight: '700', display: { xs: 'none', sm: 'block' } }}>
              Status: {order.status}
            </Typography>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2} sx={{ px: '8px' }}>
          {loadingStatus ? (
            <CircularProgress sx={{ display: { xs: 'block', sm: 'none' } }} />
          ) : (
            <Typography sx={{ fontWeight: '700', display: { xs: 'block', sm: 'none' } }}>
              Status: {order.status}
            </Typography>
          )}
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between'>
            <Typography>Recipient : {order.owner?.name}</Typography>
            <Typography>Contact Number : {order.owner?.contactNumber}</Typography>
          </Stack>

          <Typography>Delivery Address : {order.deliveryAddress}</Typography>
          <Typography>Purchased Date : {order.purchasedDate}</Typography>
        </Stack>
        <List>
          {order?.items?.map((item: ItemType, index) => {
            return <ProductItem key={index} item={item} />;
          })}
        </List>
        <Typography sx={{ textAlign: 'end', mt: '1rem' }}>Subtotal : {toCurrency(subTotal)}</Typography>
        {order.status === 'active' && currentUserType === 'customer' && (
          <Box sx={{ textAlign: 'end', mt: '1rem' }}>
            <Button
              variant='outlined'
              color='error'
              onClick={handleOpenCancelConfirmation}
              startIcon={<CancelOutlinedIcon />}
              disabled={loadingStatus}
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
        {currentUserType === 'admin' && order.status === 'active' && (
          <Box sx={{ textAlign: 'end', mt: '1rem' }}>
            <Button
              variant='outlined'
              color='error'
              onClick={handleOpenExpireConfirmation}
              startIcon={<DeleteOutlineOutlinedIcon />}
              disabled={loadingStatus}
            >
              Expire
            </Button>
            <ConfirmationModal
              open={openExpireConfirmation}
              handleClose={handleCloseExpireConfirmation}
              message='Are you sure you want to expire this order?'
              confirmFunction={expireOrderHandler}
            />
            <Button
              variant='outlined'
              color='success'
              onClick={handleOpenCompleteConfirmation}
              startIcon={<CheckCircleOutlineOutlinedIcon />}
              disabled={loadingStatus}
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
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderAccordion;
