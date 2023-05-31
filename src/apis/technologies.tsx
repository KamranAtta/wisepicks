import axios from 'axios';

export const getTechnologies = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/getTechnologies')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};
