const form = document.querySelector('.search-form');

const BASE_URL = ghjfk;
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = form.elements.searchQuery.value;
  console.log(input);
});
