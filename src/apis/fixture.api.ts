/* eslint-disable no-console */
import { doPost } from '../utils/request';

export const getFixtures = async (data: any) => {
  try {
    const response = await doPost('/getFixtures', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getFixtureByName = async (data: any) => {
  try {
    const response = await doPost('/getFixtureByName', data);
    return response;
  } catch (err: any) {
    return err;
  }
};