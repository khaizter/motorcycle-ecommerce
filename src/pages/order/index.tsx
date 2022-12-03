import { Box, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'src/context/auth-context';
import OrderApi from 'src/common/api/order';

import { OrderType } from 'src/pages/order/model';
import OrderAccordion from 'src/pages/order/order-accordion';

import { useSnackbar } from 'notistack';

const Order = () => {
  const { currentToken, currentUserType } = useContext(AuthContext);
  const [orders, setOrders] = useState<Array<OrderType>>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const loadOrders = async () => {
    if (!currentToken || !currentUserType) return;
    OrderApi.getOrders(currentToken, currentUserType)
      .then(res => {
        const transformedOrders = res.data.orders.map((order: any) => {
          return {
            id: order._id,
            deliveryAddress: order.deliveryAddress,
            items: order.items,
            purchasedDate: order.purchasedDate,
            status: order.status,
            owner: order.owner
          };
        });
        setOrders(transformedOrders);
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message || err.message, { variant: 'error' });
      });
  };

  useEffect(() => {
    loadOrders();
  }, [currentToken, currentUserType]);

  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>Orders</Typography>

      <Box component='section'>
        {orders.map((order, index) => {
          return (
            <OrderAccordion
              key={index}
              order={order}
              expanded={expanded === order.id}
              handleChange={handleChange}
              refreshOrders={loadOrders}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Order;
