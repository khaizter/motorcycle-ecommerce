import axios from 'axios';

export const getProducts = async () => {
  const endpoint = '/product';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint);
  return response;
};

export const addProduct = async (name: string, description: string, price: number, image: string) => {
  const endpoint = '/product';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, {
    name: name,
    description: description,
    price: price,
    image: image
  });
  return response;
};

const module = { getProducts, addProduct };

export default module;
