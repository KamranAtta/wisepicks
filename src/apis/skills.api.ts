import { doGet } from '../utils/request';

export const getSkills = async () => {
  try {
    const response = await doGet('/skills');
    if (response?.data?.statusCode) return response?.data?.data;
  } catch (err) {
    return [];
  }
};
