export const AUTH_TOKEN = 'Authorization';

export const LOCAL_STORAGE = {
  ID_TOKEN: 'token',
  USER: 'user',
};

export const VIDEO_TYPE_OPTIONS = [
  {
    value: 'Show',
    label: 'Show',
  },
  {
    value: 'Movies',
    label: 'Movies',
  },
  {
    value: 'Trailers',
    label: 'Trailers',
  },
];

export const VIDEO_CATEGORY_OPTIONS = [
  {
    value: 'Recommended',
    label: 'Recommended',
  },
  {
    value: 'Featured',
    label: 'Featured',
  },
  {
    value: 'Most Viewed',
    label: 'Most Viewed',
  },
  {
    value: 'Latest Movies',
    label: 'Latest Movies',
  },
  {
    value: 'Latest TV Shows',
    label: 'Latest TV Shows',
  },
  {
    value: 'Hollywood Movie Trailer',
    label: 'Hollywood Movie Trailer',
  },
  {
    value: 'Bollywood Movie Trailer',
    label: 'Bollywood Movie Trailer',
  },
  {
    value: 'Hollywood Serie Trailer',
    label: 'Hollywood Serie Trailer',
  },
  {
    value: 'Bollywood Serie Trailers',
    label: 'Bollywood Serie Trailers',
  },
];

export const ADD_VIDEO_TYPE_OPTIONS = [
  {
    value: 'Show',
    label: 'Show',
  },
  {
    value: 'Movies',
    label: 'Movies',
  },
];

export const ADD_VIDEO_CATEGORY_OPTIONS = [
  {
    value: 'Recommended',
    label: 'Recommended',
  },
  {
    value: 'Featured',
    label: 'Featured',
  },
  {
    value: 'Most Viewed',
    label: 'Most Viewed',
  },
  {
    value: 'Latest Movies',
    label: 'Latest Movies',
  },
  {
    value: 'Latest TV Shows',
    label: 'Latest TV Shows',
  },
];

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
  ADD_NEW_VIDEO: 'Add new Video',
};

export const talkCategories = [
  {
    title: 'Trailers',
    categories: [
      'Hollywood Movie Trailer',
      'Bollywood Movie Trailer',
      'Hollywood Serie Trailer',
      'Bollywood Serie Trailers',
    ]
  },
];

export const featuredTalk = {
  title: 'Your creative superpowers can help protect democracy',
  description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
  thumbnail: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
}

export const talkTypes = {
  trending: {
    totalCards: 8,
    spanSize: 3
  },
  newTalks: {
    totalCards: 6,
    spanSize: 4
  },
  climate: {
    totalCards: 8,
    spanSize: 4
  },
  future: {
    totalCards: 8,
    spanSize: 3
  },
  categoryTalks: {
    totalCards: 20,
    spanSize: 3
  },
  searchVideos: {
    totalCards: 20,
    spanSize: 4
  },
}

export const categories = [
  {
    label: 'Movies',
    value: 'movies',
  },
  {
    label: 'TV Shows',
    value: 'tv-shows',
  },
  {
    label: 'Trailers',
    value: 'Trailers'
  },
  // {
  //   label: 'Featured',
  //   value: 'Featured Talks'
  // },
  // {
  //   label: 'Climate Change',
  //   value: 'Climate Talks'
  // },
  // {
  //   label: 'Artificial Intelligence',
  //   value: 'AI and the future'
  // },
  // {
  //   label: 'Future',
  //   value: 'Studying Future'
  // },
]
export const categoryNames = [
  'Newest',
  'Trending',
  'Featured',
  'Climate',
  'Artificial',
  'Future'
];

