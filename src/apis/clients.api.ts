import { doGet, doPost } from '../utils/request';

export const getClients = async () => {
  try {
    const response = await doGet('/client');
    if (response?.data?.statusCode == 200) {
      return response?.data?.data;
    }
  } catch (err: any) {
    return err;
  }
};

export const addClients = async (body: object) => {
  try {
    const response = await doPost('/client', body);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};
