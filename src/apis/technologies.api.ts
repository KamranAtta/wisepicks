import { doGet } from '../utils/request';

export const getTechnologies = async () => {
  try {
    const response = await doGet('/getTechnologies');
    return response?.data;
  } catch (err: any) {
    return err;
  }
};
