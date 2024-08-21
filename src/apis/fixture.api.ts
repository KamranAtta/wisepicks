/* eslint-disable no-console */
import { doPost } from '../utils/request';

export const getHomeTalks = async (data: any) => {
  try {
    const response = await doPost('/getHomeTalks', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getTedTalks = async (data: any) => {
  try {
    const response = await doPost('/getTalks', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getMovies = async (data: any) => {
  try {
    const response = await doPost('/getMovies', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getShows = async (data: any) => {
  try {
    const response = await doPost('/getShows', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getTedTalksById = async (data: any) => {
  try {
    const response = await doPost('/getTalksById', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const JustTalkById = async (id: string) => {
  try {
    const response = await doPost('/JustTalkById', {id: id});
    return response;
  } catch (err: any) {
    return err;
  }
};

export const createTalk = async (data: any) => {
  try {
    const response = await doPost('/createTalk', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const addVideo = async (data: any) => {
  try {
    const response = await doPost('/addVideo', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const authenticateAdmin = async (data: any) => {
  try {
    const response = await doPost('/authenticateUser', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const updateTalk = async (data: any) => {
  try {
    const response = await doPost('/updateTalk', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const deleteVideo = async (data: any) => {
  try {
    const response = await doPost('/deleteVideo', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const updateComments = async (data: any) => {
  try {
    const response = await doPost('/updateComments', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getCommentsByVideo = async (data: any) => {
  try {
    const response = await doPost('/getCommentsByVideo', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const searchTalk = async (searchText: string) => {
  try {
    const response = await doPost('/talk/search', {searchText: searchText});
    return response;
  } catch (err: any) {
    return err;
  }
};

export const sendMail = async (body: any) =>{
  try {
    const response = await doPost('/sendMessage', body);
    return response;
  } catch (err: any) {
    return err;
  }
}