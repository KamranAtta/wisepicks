import { doDelete, doGet, doPost } from '../utils/request';

export const createVacation = async (body: object) => {
  try {
    const response = await doPost('/vacations/', body);
    response;
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getVacations = async () => {
  try {
    const response = await doGet('/vacations');
    if (response?.data?.statusCode == 200) {
      return response?.data?.data;
    }
  } catch (err: any) {
    return err;
  }
};

export const removeResourceVacation = async (id: string) => {
  try {
    const response = await doDelete(`/vacations/${id}`, {});
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getResourceVacations = async (resourceId: string) => {
  try {
    const response = await doGet(`/vacations?${`resource-id=${resourceId}`}`);
    if (response?.statusCode == 200) {
      return response?.data;
    }
  } catch (err: any) {
    return err;
  }
};

export const getReplacementResources = async (body: object) => {
  try {
    const response = await doPost('/vacations/replacement-resources', body);
    response;
    return response?.data;
  } catch (err: any) {
    return err;
  }
};
