import searchPicture from './js/pixabay-api.js';
import { galleryTemplate, renderGallery } from './js/render-functions.js';
import { refs } from './js/refs.js';
import { loadMoreBtnShow } from './js/render-functions.js';

export let searchRequest = '';
export let page = 1;

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const searchTopic = e.target.elements.query.value.trim();

  if (searchTopic !== '') {
    searchRequest = searchTopic;
    console.log(searchRequest);
    refs.loader.classList.remove('isHidden');
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('isHidden');
    page = 1;
    searchPicture(searchTopic, page)
      .then(data => {
        galleryTemplate(data);
        renderGallery(data);
        refs.loader.classList.add('isHidden');
        loadMoreBtnShow(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  e.target.reset();
});

refs.loadMoreBtn.addEventListener('click', () => {
  page += 1;
  console.log(searchRequest);
  searchPicture(searchRequest, page)
    .then(data => {
      galleryTemplate(data);
      renderGallery(data);
      refs.loader.classList.add('isHidden');
      loadMoreBtnShow(data);
    })
    .catch(error => {
      console.error(error);
    });
  // console.log(page);
});
