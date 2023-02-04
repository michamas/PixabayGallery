import Notiflix from 'notiflix';
import { _ } from 'lodash';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const pictureGallery = document.querySelector('.gallery');

const KEY = '33302175-33178da1359f032779e0154a7';
const query = searchInput.value;
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = true;

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
  safeSearch;

function clearGallery() {
  pictureGallery.innerHTML = '';
}

function createGallery(imgSrc, imgAlt, likes, views, comments, downloads) {
  const pictureDiv = document.createElement('div');
  pictureDiv.innerHTML = `
  <div class="photo-card">
  <img src="${imgSrc}" alt="${imgAlt}" loading="lazy" width="300px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>
`;
  pictureGallery.append(pictureDiv);
}

function findPictures(searchQuery) {
  fetch(URL)
    .then(r => {
      if (r.ok) {
        return r.json();
      } else {
        Notiflix.Notify.warning('Opps, nothing found.');
        clearGallery();
      }
    })
    .then(r => {
      console.log(r);
      //   const hits = r['hits'];
      //   console.log(hits);
      for (let i = 0; ; i++) {
        createGallery(
          r['hits'][i]['largeImageURL'],
          r['hits'][i]['tags'],
          r['hits'][i]['likes'],
          r['hits'][i]['views'],
          r['hits'][i]['comments'],
          r['hits'][i]['downloads']
        );
      }
    })
    .catch(e => console.log(e));
}

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  clearGallery();
  if (searchInput.value.trim() != '') {
    findPictures(query);
  } else {
    Notiflix.Notify.warning('Type any word in the search box!');
  }
});
