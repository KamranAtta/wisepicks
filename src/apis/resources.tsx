import axios from 'axios';

export const requestResources = (body: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_SERVER_API + '/requestResources/', body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};
export const getResources = (input: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/getResources?input=' + input)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const getAllResources = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/getAllResources')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const assignResource = (body: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_SERVER_API + '/assignResource', body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const deleteResource = (body: any) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(process.env.REACT_APP_SERVER_API + '/deleteResource', body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};
