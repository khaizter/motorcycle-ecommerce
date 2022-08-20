import axios from 'axios';

export const getCart = async (token: string) => {
  const endpoint = '/cart';
  const response = await axios.get(process.env.REACT_APP_BACKEND_URI + endpoint, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return response;
};

export const updateCart = async (token: string, items: any) => {
  console.log(items);
  const transformedItems = items.map((item: any) => {
    return {
      productId: item.id,
      thumbnail: item.thumbnail,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    };
  });
  const endpoint = '/cart';
  const response = await axios.put(
    process.env.REACT_APP_BACKEND_URI + endpoint,
    {
      items: transformedItems
    },
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );
  return response;
};

const module = { getCart, updateCart };

export default module;
