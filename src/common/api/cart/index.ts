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

const module = { getCart };

export default module;
