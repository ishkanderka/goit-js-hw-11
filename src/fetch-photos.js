import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotos(input, page = 1) {
  const params = new URLSearchParams({
    key: '36072059-95eba457d7f0e9185349988ad',
    q: input,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  try {
    const { data } = await axios.get(BASE_URL, { params });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
