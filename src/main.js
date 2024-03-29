import searchPicture from './js/pixabay-api.js';
import { galleryTemplate, renderGallery } from './js/render-functions.js';
import { refs } from './js/refs.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import stopIcon from './img/stop-icon.svg';

export let searchRequest = '';
export let page = 1;

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const searchTopic = e.target.elements.query.value.trim();

  if (searchTopic !== '') {
    searchRequest = searchTopic;
    refs.loader.classList.remove('isHidden');
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('isHidden');
    page = 1;
    searchPicture(searchTopic, page)
      .then(data => {
        galleryTemplate(data);
        renderGallery(data);
        refs.loader.classList.add('isHidden');
      })
      .catch(error => {
        console.error(error);
      });
  }

  e.target.reset();
});

refs.loadMoreBtn.addEventListener('click', () => {
  page += 1;
  refs.loadMoreBtn.classList.add('isHidden');
  refs.loader.classList.remove('isHidden');
  searchPicture(searchRequest, page)
    .then(data => {
      galleryTemplate(data);
      renderGallery(data);
      refs.loader.classList.add('isHidden');
      scrollPage();
    })
    .catch(error => {
      console.error(error);
    });
});

export function loadMoreBtnShow(resultsArr) {
  const totalHits = resultsArr.totalHits;
  const maxPage = Math.ceil(totalHits / 15);
  if (page < maxPage) {
    refs.loadMoreBtn.classList.remove('isHidden');
  } else {
    refs.loadMoreBtn.classList.add('isHidden');
    iziToast.show({
      message: "We're sorry, but you've reached<br>the end of search results.",
      color: 'blue',
      messageColor: '#001',
      backgroundColor: '#6c8cff',
      messageSize: '16',
      position: 'topRight',
      iconUrl: stopIcon,
      messageLineHeight: '24',
      closeOnClick: 'true',
      close: 'false',
      transitionIn: 'fadeInLeft',
    });
  }
}

function scrollPage() {
  if (page > 1) {
    const rect = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({ top: rect.height * 3, left: 0, behavior: 'smooth' });
  }
}
