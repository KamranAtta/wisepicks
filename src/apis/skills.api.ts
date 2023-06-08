import { doGet } from '../utils/request';

export const getSkills = async () => {
  try {
    const response = await doGet('/skills');
    return response?.data?.data?.skills;
  } catch (err) {
    return [];
  }
};
