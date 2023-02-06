import Notiflix from 'notiflix';
import { _ } from 'lodash';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const loadBtn = document.querySelector('.load-more');
loadBtn.style.visibility = 'hidden';
const pictureGallery = document.querySelector('.gallery');

const KEY = '33302175-33178da1359f032779e0154a7';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = true;
const page = 1;
const perPage = 40;

function clearGallery() {
  //   document.querySelector('.photo-car').remove();
  pictureGallery.innerHTML = '';
}

function createGallery(
  largeImg,
  smallImg,
  imgAlt,
  likes,
  views,
  comments,
  downloads
) {
  const pictureDiv = document.createElement('div');
  pictureDiv.innerHTML = `
  <div class="photo-card">
  <a href='${largeImg}' class='photo-link'><img src="${smallImg}" alt="${imgAlt}" loading="lazy"/></a>
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
  const lightbox = new SimpleLightbox('.photo-card .photo-link', {
    enableKeyboard: true,
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

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
    '&safesearch=' +
    safeSearch +
    '&page=' +
    page +
    '&per_page=' +
    perPage;
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
      const hits = r.hits;
      const totalHits = r.totalHits;
      console.log(hits);
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

      for (let hit of hits) {
        createGallery(
          hit.largeImageURL,
          hit.previewURL,
          hit.tags,
          hit.likes,
          hit.views,
          hit.comments,
          hit.downloads
        );
      }
    })
    .catch(e => console.log(e));
}
loadBtn.addEventListener('click', () => {
  //   page++;
  console.log(page);
  lightbox.refresh();

  console.log('load more');
});

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  clearGallery();
  if (searchInput.value.trim() != '') {
    findPictures(searchInput.value);

    loadBtn.style.visibility = 'visible';
  } else {
    Notiflix.Notify.warning('Type any word in the search box!');
  }
});
