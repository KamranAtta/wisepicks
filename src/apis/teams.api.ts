import { doGet } from '../utils/request';

export const getTeams = async (name = '') => {
  try {
    const response = await doGet('/teams?name=' + name);
    response;
    if (response?.data?.statusCode == 200) {
      response?.data?.data;
      return response?.data?.data;
    }
  } catch (err) {
    err;
  }
};
