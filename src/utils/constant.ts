export const USER_ROLES = ['admin', 'developer'];
export const AUTH_TOKEN = 'Authorization';

export const LOCAL_STORAGE = {
  ID_TOKEN: 'token',
  USER: 'user',
};

export const MESSAGES = {
  PROJECT_ADD_SUCCESS: 'New Project Has Been Added',
  VACATION_ADD_SUCCESS: 'New Vacation Has Been Added',
  RESOURCE_ALLOCATE_SUCCESS: 'Resource Allocated',
  PROJECT_EDIT_SUCCESS: 'Project Has Been Edited',
  CLIENT_ADD_SUCCESS: 'New Client Has Been Added',
  RESOURCE_REQUEST_SUCCESS: 'Resource Has Been Requested Successfully',
  RESOURCE_ADD_SUCCESS: 'Resource Has Been added Successfully',
  ERROR: 'Some Error Occured',
  RESOURCE_REMOVE_SUCCESS: 'Resource removed successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
};

export const categories = [
  // {
  //   label: 'streamsToday',
  //   value: 'Streams today'
  // },
  {
    label: 'Soccer',
    value: 'Streams today'
  },
  {
    label: 'Formula 1',
    value: 'F1'
  },
  {
    label: 'Tennis',
    value: 'Tennis'
  },
  {
    label: 'Boxing',
    value: 'Boxing'
  },
  {
    label: 'Cricket',
    value: 'Cricket'
  }
]

export const FORMATS = {
  DATE_FORMAT: 'YYYY-MM-DD',
};

export const PROJECT_QUERY_INITIAL = {
  query: {
    page: 1,
    pageSize: 10,
  },
  status: '',
};

export const EMPLOYMENT_UTILIZATION = ['Under-Utilized', 'Normal', 'Over-Utilized'];
export const ASSIGNED_LEVELS = ['L3', 'L4', 'L5', 'L6', 'L7'];
export const EMPLOYMENT_STATUS = ['Full-Time', 'Part-Time'];
export const FTE_RANGES = [20, 50, 80, 100];
