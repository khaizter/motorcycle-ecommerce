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

const addProduct = async (
  token: string,
  name: string,
  description: string,
  price: number,
  availableStocks: number,
  image: File
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price.toString());
  formData.append('availableStocks', availableStocks.toString());
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
  const endpoint = `/product/${productId}`;
  const response = await axios.delete(process.env.REACT_APP_BACKEND_URI + endpoint, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return response;
};

const updateProductStocks = async (token: string, productId: string, availableStocks: number) => {
  const endpoint = `/product/${productId}`;
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      updatedStocks: availableStocks
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const module = { getProducts, getProduct, addProduct, deleteProduct, updateProductStocks };

export default module;
