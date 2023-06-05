import { doGet, doPost } from '../utils/request';

export const getClients = async () => {
  try {
    const response = await doGet('/getClients');
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const addClients = async (body: object) => {
  try {
    const response = await doPost('/getResources', body);
    return response?.data;
  } catch (err) {
    return [];
  }
};
