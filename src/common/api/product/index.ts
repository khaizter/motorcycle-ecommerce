import axios from 'axios';

const getProducts = async () => {
  const endpoint = '/product';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint);
  return response;
};

const getProduct = async (productId: string) => {
  const endpoint = `/product/${productId}`;
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint);
  return response;
};

const addProduct = async (token: string, name: string, description: string, price: number, image: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price.toString());
  formData.append('image', image);

  const endpoint = '/product';
  const response = await axios.post(process.env.REACT_APP_BACKEND_URI + endpoint, formData, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return response;
};

const deleteProduct = async (token: string, productId: string) => {
  console.log('delete ', productId);
  const endpoint = `/product/${productId}`;
  const response = await axios.delete(process.env.REACT_APP_BACKEND_URI + endpoint, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return response;
};

const module = { getProducts, getProduct, addProduct, deleteProduct };

export default module;
