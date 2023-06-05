import Axios from 'axios';
import { getLocalStorage } from './localStorage';
import { AUTH_TOKEN, LOCAL_STORAGE } from '../utils/constant';
const SERVER_API: string | undefined = process.env.REACT_APP_SERVER_API;

export const doGet = async (path: string, headers: object = {}, baseURL = '') => {
  const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

  const response = await Axios({
    url: `${path}`,
    baseURL: SERVER_API ? SERVER_API : baseURL,
    method: 'GET',
    // withCredentials: true,
    headers: setHeader(token, headers),
  });

  const { statusText, data: newData, status } = response;

  return {
    statusText,
    data: newData,
    statusCode: status,
  };
};

export const doPost = async (path: string, data: object, headers: object = {}, baseURL = '') => {
  const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

  const response = await Axios({
    url: path,
    baseURL: baseURL,
    method: 'POST',
    // withCredentials: true,
    headers: setHeader(token, headers),
    data,
  });

  const { statusText, data: newData, status } = response;

  return {
    statusText,
    data: newData,
    statusCode: status,
  };
};

export const doPut = async (path: string, data: object, headers: object = {}, baseURL = '') => {
  const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

  const response = await Axios({
    url: path,
    baseURL: baseURL,
    method: 'PUT',
    // withCredentials: true,
    headers: setHeader(token, headers),
    data,
  });

  const { statusText, data: newData, status } = response;

  return {
    statusText,
    data: newData,
    statusCode: status,
  };
};

export const doPatch = async (
  path: string,
  data: object,
  headers: object = {},
  baseURL: string,
) => {
  const token = '';

  const response = await Axios({
    url: path,
    baseURL: baseURL,
    method: 'PATCH',
    // withCredentials: true,
    headers: setHeader(token, headers),
    data,
  });

  const { statusText, data: newData, status } = response;

  return {
    statusText,
    data: newData,
    statusCode: status,
  };
};

export const doDelete = async (path: string, data: object, headers: object = {}, baseURL = '') => {
  const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

  const response = await Axios({
    url: path,
    baseURL: baseURL,
    method: 'DELETE',
    // withCredentials: true,
    headers: setHeader(token, headers),
    data,
  });

  const { statusText, data: newData, status } = response;
  return {
    statusText,
    data: newData,
    statusCode: status,
  };
};

const setHeader = (token: string, headers: object) => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    [AUTH_TOKEN]: token ? `Bearer ${token}` : '',
    ...headers,
  };
};
