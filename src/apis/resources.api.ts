import { doDelete, doGet, doPost, doPut } from '../utils/request';

export const createResource = async (body: object) => {
  try {
    const response = await doPost('/resource/', body);
    response;
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const requestResources = async (body: object) => {
  try {
    const response = await doPost('/requestResources/', body);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getResources = async (input: string) => {
  try {
    const response = await doGet(`/getResources?input=${input}`);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getResource = async (resourceId: string) => {
  try {
    const response = await doGet(`/resource/${resourceId}`);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getAllResources = async (input: string) => {
  try {
    const response = await doGet(`/resource${input}`);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getAllResourcesSorted = async (params: string) => {
  try {
    const response = await doGet(`/resource/sorted?${params}`);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const assignResource = async (body: object) => {
  try {
    const response = await doPost('/project-resources', body);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const deleteResource = async (body: object) => {
  try {
    const response = await doDelete('/deleteResource', body);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const updateProjectResource = async (id: string, body: object) => {
  try {
    const response = await doPut(`/project-resources/${id}`, body);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};
