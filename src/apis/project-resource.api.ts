import { doGet } from '../utils/request';

interface ProjResQuery {
  isPlan?: boolean;
}

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
  } catch (err) {
    err;
  }
};
