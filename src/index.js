import { fetchPhotos } from './fetch-photos';
import { Notify } from 'notiflix';
import './styles.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

btn.style.display = 'none';

let page = 1;
let per_page = 40;
let totalHits = 0;
let totalPages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const input = form.elements.searchQuery.value.trim();
    const images = await fetchPhotos(input, page);
    gallery.innerHTML = '';

    if (input === '') {
      btn.style.display = 'none';
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (images.hits.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    renderGallery(images);
    btn.style.display = 'block';
    Notify.success(`Hooray! We found ${images.totalHits} images.`);
    page += 1;
  } catch (error) {
    console.log(error.message);
  }
});

btn.addEventListener('click', async () => {
  try {
    const input = form.elements.searchQuery.value.trim();
    const images = await fetchPhotos(input, page);
    totalHits = images.totalHits;
    totalPages = totalHits / per_page;

    if (page > totalPages) {
      btn.style.display = 'none';
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    renderGallery(images);
    page += 1;
  } catch (error) {
    console.log(error.message);
  }
});

function renderGallery(images) {
  const markup = images.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes </b>${likes}
        </p>
        <p class="info-item">
          <b>Views </b>${views}
        </p>
        <p class="info-item">
          <b>Comments </b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads </b>${downloads}
        </p>
      </div>
    </div>`;
    }
  );
  gallery.insertAdjacentHTML('beforeend', markup.join(''));
}
