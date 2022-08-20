import axios from 'axios';

export const getProducts = async () => {
  const endpoint = '/product';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint);
  return response;
};

const module = { getProducts };

export default module;
