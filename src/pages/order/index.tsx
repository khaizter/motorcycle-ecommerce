import { Box, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'src/context/auth-context';
import OrderApi from 'src/common/api/order';

import { OrderType } from 'src/pages/order/model';
import OrderAccordion from 'src/pages/order/order-accordion';

const Order = () => {
  const { currentToken, currentUserType } = useContext(AuthContext);
  const [orders, setOrders] = useState<Array<OrderType>>([]);
  console.log(orders);
  useEffect(() => {
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
        console.log(err);
      });
  }, [currentToken, currentUserType]);
  return (
    <Box component='main' sx={{ maxWidth: 'var(--horizontal-wrapper)', mx: 'auto' }}>
      <Typography variant='h3'>My Order</Typography>

      <Box component='section'>
        {orders.map((order, index) => {
          return <OrderAccordion key={index} order={order} />;
        })}
      </Box>
    </Box>
  );
};

export default Order;
