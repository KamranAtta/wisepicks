import axios from 'axios';

export const getClients = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/getClients')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const addClients = (values: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_SERVER_API + '/addClients', values)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};
