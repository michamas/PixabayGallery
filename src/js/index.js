import Notiflix from 'notiflix';
import { _ } from 'lodash';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const pictureGallery = document.querySelector('.gallery');

const KEY = '33302175-33178da1359f032779e0154a7';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = true;
// const page = 1;
const perPage = 10;

function clearGallery() {
  //   document.querySelector('.photo-car').remove();
  pictureGallery.innerHTML = '';
}

function createGallery(imgSrc, imgAlt, likes, views, comments, downloads) {
  const pictureDiv = document.createElement('div');
  pictureDiv.innerHTML = `
  <div class="photo-card">
  <img src="${imgSrc}" alt="${imgAlt}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>
`;
  pictureGallery.append(pictureDiv);
}

function findPictures(query) {
  const URL =
    'https://pixabay.com/api/?key=' +
    KEY +
    '&q=' +
    query +
    '&image_type=' +
    imageType +
    '&orientation=' +
    orientation +
    'safesearch=' +
    safeSearch +
    // 'page=' +
    // 1 +
    'per_page=' +
    perPage;
  console.log(URL);
  fetch(URL)
    .then(r => {
      if (r.ok) {
        return r.json();
      } else {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        clearGallery();
      }
    })
    .then(r => {
      //   console.log(hits);
      const hits = r['hits'];
      console.log(hits);
      const totalHits = r['totalHits'];
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

      for (let i = 0; ; i++) {
        createGallery(
          hits[i]['previewURL'],
          hits[i]['tags'],
          hits[i]['likes'],
          hits[i]['views'],
          hits[i]['comments'],
          hits[i]['downloads']
        );
      }
    })
    .catch(e => console.log(e));
}

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  clearGallery();
  if (searchInput.value.trim() != '') {
    findPictures(searchInput.value);
  } else {
    Notiflix.Notify.warning('Type any word in the search box!');
  }
});
