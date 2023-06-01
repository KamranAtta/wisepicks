import { doGet } from '../utils/request';

export const getAllProjects = async (input: string) => {
  try {
    const response = await doGet('/getAllProjects?input=' + input);
    return response?.data;
  } catch (err) {
    return [];
  }
};
