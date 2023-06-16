/* eslint-disable no-console */
import { doGet } from '../utils/request';

export const getTeams = async () => {
  try {
    const response = await doGet('/teams');
    console.log(response);
    if (response?.data?.statusCode == 200) {
      console.log(response?.data?.data);
      return response?.data?.data;
    }
  } catch (err) {
    console.log(err);
  }
};
