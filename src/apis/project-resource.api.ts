import { doGet, doPut, doPost, doDelete, doPatch } from '../utils/request';

interface ProjResQuery {
  isPlan?: boolean;
}

export const assignResource = async (body: object) => {
  try {
    const response = await doPost('/project-resources/', body);
    response;
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const allocateResource = async (body: object) => {
  try {
    const response = await doPost('/project-resources/allocate', body);
    response;
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

export const assignProjectResources = async (body: object) => {
  try {
    const response = await doPatch('/project-resources/', body);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const removeProjectResource = async (id: string, body: object) => {
  try {
    const response = await doDelete(`/project-resources/${id}`, body);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getProjectResource = async (id: string, queryParams: ProjResQuery) => {
  try {
    const response = await doGet(
      `/project-resources/${id}?${
        queryParams?.isPlan ? `isPlan=${queryParams?.isPlan === true}` : ''
      }`,
    );
    if (response?.statusCode == 200) {
      return response?.data;
    }
  } catch (err: any) {
    return err;
  }
};

export const getProjectResources = async (projectId: string) => {
  try {
    const response = await doGet(`/project-resources/?${`project-id=${projectId}`}`);
    if (response?.statusCode == 200) {
      return response?.data;
    }
  } catch (err: any) {
    return err;
  }
};

export const getProjectResourceAllocation = async (projectId: string) => {
  try {
    const response = await doGet(`/project-resources/allocation?${`project-id=${projectId}`}`);
    if (response?.statusCode == 200) {
      return response?.data;
    }
  } catch (err: any) {
    return err;
  }
};

export const getSuggestedEngineers = async (queryParams: any) => {
  try {
    const response = await doGet(`/project-resources/suggested-engineers?${queryParams}`);
    if (response?.statusCode == 200) {
      return response?.data;
    }
  } catch (err: any) {
    return err;
  }
};
