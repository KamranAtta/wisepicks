import { doDelete, doGet, doPost } from '../utils/request';

export const requestResources = async (body: object) => {
  try {
    const response = await doPost('/requestResources/', body);
    return response?.data;
  } catch (err) {
    // TODO: add sentry
    // TODO: show alert
    // TODO: never suppress an error
    return [];
  }
};

export const getResources = async (input: string) => {
  try {
    const response = await doGet(`/getResources?input=${input}`);
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const getResource = async (resourceId: string) => {
  try {
    const response = await doGet(`/resource/${resourceId}`);
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const getAllResources = async (input: string) => {
  try {
    const response = await doGet(`/resource${input}`);
    return response?.data;
  } catch (err) {
    return [];
  }
};

export const getAllResourcesSorted = async (params: string) => {
  try {
    const response = await doGet(`/resource/sorted?${params}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const assignResource = async (body: object) => {
  try {
    const response = await doPost('/project-resources', body);
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
