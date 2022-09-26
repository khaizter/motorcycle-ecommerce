import axios from 'axios';

export const getProducts = async () => {
  const endpoint = '/product';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint);
  return response;
};

export const addProduct = async (name: string, description: string, price: number, image: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price.toString());
  formData.append('image', image);

  const endpoint = '/product';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, formData);
  return response;
};

const module = { getProducts, addProduct };

export default module;
