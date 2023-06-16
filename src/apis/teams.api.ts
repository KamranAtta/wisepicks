import { doGet } from '../utils/request';

export const getTeams = async () => {
  try {
    const response = await doGet('/teams');
    response;
    if (response?.data?.statusCode == 200) {
      response?.data?.data;
      return response?.data?.data;
    }
  } catch (err) {
    err;
  }
};
