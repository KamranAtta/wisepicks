import { doGet } from '../utils/request';

export const getResources = async (input: string) => {
  try {
    const response = await doGet('/getResources?input=' + input);
    return response?.data;
  } catch (err) {
    return [];
  }
};
