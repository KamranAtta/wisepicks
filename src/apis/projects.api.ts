import { doGet, doPost, doPut } from '../utils/request';
import { createQueryParams } from '../utils/parser';

export const getProjectDetails = async (id: number) => {
  try {
    const response = await doGet('/project/' + id);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getProjectPlan = async (id: number) => {
  try {
    const response = await doGet('/projectPlan?id=' + id);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const createProject = async (body: object) => {
  try {
    const response = await doPost('/project/', body);
    response;
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const editProject = async (body: object) => {
  try {
    const response = await doPut('/project/', body);
    response;
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getProjects = async (input: string) => {
  try {
    const response = await doGet('/getClients?input=' + input);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getAllProjects = async (query: object) => {
  try {
    const queryParams = createQueryParams(query);
    const response = await doGet(`/project?${queryParams}`);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getProject = async (query: string) => {
  try {
    const response = await doGet(`/project/${query}`);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getAllProjectsQuery = async (query: string) => {
  try {
    const response = await doGet(`/project${query}`);
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getProjectList = async () => {
  try {
    const response = await doGet('/project');
    return response?.data?.data;
  } catch (err: any) {
    return err;
  }
};

export const getProjectLeads = async () => {
  try {
    const response = await doGet('/getProjectLeads');
    return response?.data;
  } catch (err: any) {
    return err;
  }
};

export const getClients = async () => {
  try {
    const response = await doGet('/getClients');
    return response?.data;
  } catch (err: any) {
    return err;
  }
};
