/* eslint-disable no-console */
import Axios from 'axios';
import { getLocalStorage } from './localStorage';
import { AUTH_TOKEN, LOCAL_STORAGE } from '../utils/constant';
const SERVER_API: string | undefined = process.env.REACT_APP_SERVER_API;

export const doGet = async (path: string, headers: object = {}, baseURL = 'https://www.sportsfeed24.com') => {
  try {
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
  } catch (error: any) {
    return {
      data: {
        statusText: error?.response?.statusText,
        statusCode: error.response.status,
      },
    };
  }
};

export const doPost = async (path: string, data: object, headers: object = {}, baseURL = 'https://www.sportsfeed24.com') => {
  try {
    // const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

    const response = await Axios({
      url: path,
      baseURL: SERVER_API ? SERVER_API : baseURL,
      method: 'POST',
      // withCredentials: true,
      // headers: setHeader(token, headers),
      data,
    });

    const { statusText, data: newData, status } = response;

    return {
      statusText,
      data: newData,
      statusCode: status,
    };
  } catch (error: any) {
    return {
      data: {
        statusText: error?.response?.statusText,
        statusCode: error.response.status,
      },
    };
  }
};

export const doPut = async (path: string, data: object, headers: object = {}, baseURL = 'https://www.sportsfeed24.com') => {
  try {
    const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

    const response = await Axios({
      url: path,
      baseURL: SERVER_API ? SERVER_API : baseURL,
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
  } catch (error: any) {
    return {
      data: {
        statusText: error?.response?.statusText,
        statusCode: error.response.status,
      },
    };
  }
};

export const doPatch = async (path: string, data: object, headers: object = {}, baseURL = 'https://www.sportsfeed24.com') => {
  try {
    const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

    const response = await Axios({
      url: path,
      baseURL: SERVER_API ? SERVER_API : baseURL,
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
  } catch (error: any) {
    return {
      data: {
        statusText: error?.response?.statusText,
        statusCode: error.response.status,
      },
    };
  }
};

export const doDelete = async (path: string, data: object, headers: object = {}, baseURL = 'https://www.sportsfeed24.com') => {
  try {
    const token = getLocalStorage(LOCAL_STORAGE.ID_TOKEN);

    const response = await Axios({
      url: path,
      baseURL: SERVER_API ? SERVER_API : baseURL,
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
  } catch (error: any) {
    return {
      data: {
        statusText: error?.response?.statusText,
        statusCode: error.response.status,
      },
    };
  }
};

const setHeader = (token: string, headers: object) => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    [AUTH_TOKEN]: token ? `Bearer ${token}` : '',
    ...headers,
  };
};
