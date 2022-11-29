import { Accordion, AccordionSummary, Stack, Typography, AccordionDetails, List, ListItem } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { OrderType, ItemType } from 'src/pages/order/model';
import ProductItem from 'src/pages/order/product-item';

interface PropType {
  order: OrderType;
}

const OrderAccordion: React.FC<PropType> = props => {
  const { order } = props;

  const subTotal = order?.items?.reduce((value, item) => value + item.quantity * item.price, 0) || 0;

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
          {order?.items?.map((item: ItemType, index) => {
            return <ProductItem key={index} item={item} />;
          })}
        </List>
        <Typography sx={{ textAlign: 'end' }}>Subtotal : ₱{subTotal}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderAccordion;
