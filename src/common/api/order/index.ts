import axios from 'axios';

const postOrder = async (token: string, items: any, deliveryAddress: string) => {
  const endpoint = '/order';
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      deliveryAddress,
      items
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );

  return response;
};

const getOrders = async (token: string, userType: string) => {
  const endpoint = userType === 'admin' ? '/order/list' : '/order';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return response;
};

const cancelOrder = async (token: string, orderId: string) => {
  const endpoint = '/order/cancel-order';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      orderId
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const completeOrder = async (token: string, orderId: string) => {
  const endpoint = '/order/complete-order';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    { orderId },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const deleteOrder = async (token: string, orderId: string) => {
  const endpoint = '/order/delete-order';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    { orderId },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const expireOrder = async (token: string, orderId: string) => {
  const endpoint = '/order/expire-order';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    { orderId },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const module = { postOrder, getOrders, cancelOrder, completeOrder, deleteOrder, expireOrder };

export default module;
