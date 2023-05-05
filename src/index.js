const form = document.querySelector('.search-form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const input = form.elements.searchQuery.value;
  console.log(input);
});
