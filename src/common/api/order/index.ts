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

const module = { postOrder };

export default module;
