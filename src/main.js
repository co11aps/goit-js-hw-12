import searchPicture from './js/pixabay-api.js';
import { galleryTemplate, renderGallery } from './js/render-functions.js';
import { refs } from './js/refs.js';
// import { loadMoreBtnShow } from './js/render-functions.js';
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
        // loadMoreBtnShow(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  e.target.reset();
});

refs.loadMoreBtn.addEventListener('click', () => {
  page += 1;
  searchPicture(searchRequest, page)
    .then(data => {
      galleryTemplate(data);
      renderGallery(data);
      refs.loader.classList.add('isHidden');
      // loadMoreBtnShow(data);
    })
    .catch(error => {
      console.error(error);
    });
  // console.log(page);
});

// export function loadMoreBtnShow(resultsArr) {
//   const totalHits = resultsArr.totalHits;
//   const maxPage = Math.ceil(totalHits / 15);
//   // const resultsNum = ();
//   console.log('maxPage', maxPage);
//   console.log('totalHits', totalHits);
//   if (page < maxPage) {
//     refs.loadMoreBtn.classList.remove('isHidden');
//   } else {
//     refs.loadMoreBtn.classList.add('isHidden');
//     iziToast.show({
//       message: "We're sorry, but you've reached<br>the end of search results.",
//       color: 'blue',
//       messageColor: '#001',
//       backgroundColor: '#FFF',
//       messageSize: '16',
//       position: 'topRight',
//       iconUrl: stopIcon,
//       messageLineHeight: '24',
//       closeOnClick: 'true',
//       close: 'false',
//       transitionIn: 'fadeInLeft',
//     });
//   }
// }
