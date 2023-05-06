import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotos(input) {
  const params = {
    key: '36072059-95eba457d7f0e9185349988ad',
    q: input,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  };
  try {
    const { response } = await axios.get(BASE_URL, { params });
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
