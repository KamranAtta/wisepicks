import axios from 'axios';

export const getProjectDetails = (projectId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/project/' + projectId)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const getProjectPlan = (projectId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/projectPlan?id=' + projectId)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const createProject = (body: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_SERVER_API + '/createProject/', body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const editProject = (body: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_SERVER_API + '/editProject/', body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const getProjects = (input: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/getProjects?input=' + input)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const getAllProjects = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/getAllProjects')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};

export const getProjectLeads = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_SERVER_API + '/getProjectLeads')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.errorMessage);
      });
  });
};
