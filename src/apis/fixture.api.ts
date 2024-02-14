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

export const getTedTalksById = async (data: any) => {
  try {
    const response = await doPost('/getTalksById', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getFixtures = async (data: any) => {
  try {
    const response = await doPost('/getSoccerFixtures', data);
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

export const getIframe = async (data: any) => {
  try {
    const response = await doPost('/getIframe', data);
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getStreamLinks = async (fixture: any) =>{
  const filter = {
    categoryName: fixture?.categoryName,
    subCat: fixture?.subCategoryName,
    teamA: fixture?.game.teamA,
    teamB:  fixture?.game.teamB,
    link: fixture?.game?.sourceLink,
  }
  try {
    const response = await doPost('/getLiveStreams', filter);
    return response;
  } catch (err: any) {
    return err;
  }
}

export const sendMail = async (body: any) =>{
  try {
    const response = await doPost('/sendMessage', body);
    return response;
  } catch (err: any) {
    return err;
  }
}

export const getStandings = async (body: any) =>{
  try {
    const response = await doPost('/getStandings', body);
    return response;
  } catch (err: any) {
    return err;
  }
}