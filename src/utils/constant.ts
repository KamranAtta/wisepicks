export const AUTH_TOKEN = 'Authorization';

export const LOCAL_STORAGE = {
  ID_TOKEN: 'token',
  USER: 'user',
};

export const MESSAGES = {
  EMAIL_SUCCESS: 'Your email has been sent successfully!',
  EMAIL_FAILURE: 'Unable to sent email!',
  COMMENT_SUCCESS: 'Thank you for sharing insights!',
  COMMENT_FAILURE: 'Unable to comment',
  LOGIN_ERROR: 'You dont not have permission to perform this task!',
  ERROR: 'SOmething went wrong'
}

export const PAGE_TITLES = {
  ADD_NEW_TALK: 'Add new Talk',
  EDIT_TALK: 'Edit Talk',
};

export const talkCategories = [
  'TED-Ed',
  'Psychology',
  'Leadership',
  'Education',
  'Artificial Intelligence',
  'Sleep',
  'Mental Health',
  'Business',
  'Motivation',
  'Communication',
  'Personal Growth',
  'Sports',
  'Health',
  'Language'
];

export const featuredTalk = {
  title: 'Your creative superpowers can help protect democracy',
  description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
  thumbnail: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
}

export const talkTypes = {
  trending: {
    totalCards: 3,
    spanSize: 8
  },
  newTalks: {
    totalCards: 6,
    spanSize: 4
  },
  climate: {
    totalCards: 4,
    spanSize: 6
  },
  future: {
    totalCards: 6,
    spanSize: 4
  },
  categoryTalks: {
    totalCards: 20,
    spanSize: 6
  },
}

export const categories = [
  {
    label: 'Newest',
    value: 'Newest Talks'
  },
  {
    label: 'Trending',
    value: 'Trending Talks'
  },
  {
    label: 'Featured',
    value: 'Featured Talks'
  },
  {
    label: 'Climate Change',
    value: 'Climate Talks'
  },
  {
    label: 'Artificial Intelligence',
    value: 'AI and the future'
  },
  {
    label: 'Future',
    value: 'Studying Future'
  },
]
export const categoryNames = [
  'Newest',
  'Trending',
  'Featured',
  'Climate',
  'Artificial',
  'Future'
];

