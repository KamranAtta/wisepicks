import { doDelete, doGet, doPost } from '../utils/request';

export const requestResources = async (body: object) => {
  try {
    const response = await doPost('/requestResources/', body);
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const getResources = async (input: string) => {
  try {
    const response = await doGet('/getResources?input=' + input);
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const getAllResources = async () => {
  try {
    const response = await doGet('/getAllResources');
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const assignResource = async (body: object) => {
  try {
    const response = await doPost('/assignResource', body);
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const deleteResource = async (body: object) => {
  try {
    const response = await doDelete('/deleteResource', body);
    return response?.data;
  } catch (err) {
    return [];
  }
};
