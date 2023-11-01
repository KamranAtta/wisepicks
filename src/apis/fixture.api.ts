/* eslint-disable no-console */
import { doPost } from '../utils/request';

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