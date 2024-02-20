import axios from 'axios';

export default async function searchPicture(userValue, page) {
  const API_KEY = '42365845-25d760151cd88cf2d1cecf2ad';
  axios.defaults.baseURL = 'https://pixabay.com';
  const response = await axios.get('/api/', {
    params: {
      key: API_KEY,
      q: userValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page: page,
    },
  });
  return response.data;
}
