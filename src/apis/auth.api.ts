import { doGet, doPost } from '../utils/request';

export const loginUser = async (body: object) => {
  try {
    const response = await doPost('/auth/login', body);
    return response?.data;
  } catch (err) {
    err;
  }
};

export const getMe = async () => {
  try {
    const response = await doGet('/auth/me');
    return response.data;
  } catch (err: any) {
    return err;
  }
};


