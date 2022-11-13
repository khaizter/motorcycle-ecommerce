import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Stack, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'src/context/auth-context';
import OrderApi from 'src/common/api/order';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Order = () => {
  const { currentToken, currentUserType } = useContext(AuthContext);
  const [orders, setOrders] = useState<Array<any>>([]);
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

      {orders.map(order => {
        return (
          <Accordion key={order.id}>
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
                {order.items.map((item: any) => {
                  return <ListItem divider>{item.name}</ListItem>;
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default Order;
