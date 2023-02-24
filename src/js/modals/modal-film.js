import { getRefs } from '../refs';
import FilmsData from '../moviesAPI/filmsData';
import { renderModalMarkup } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import { markupModalCreating } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import renderErrorModalMarkup from '../renderMarkupFilmoteka/renderErrorModalMarkup';
import { addMod, removeMod } from './modal-film-btn';
import { fbFilmsData, PLACE_Q, PLACE_W } from '../firebaseFilm/fbFilms';
import { fbFilmsAuth } from '../firebaseFilm/testAuth';
import TrailerApiService from './modal-trailer';
import { lStorage } from '../renderMarkupFilmoteka/getFilmsServis';

const language = lStorage.get('language');

const trailerApiService = new TrailerApiService();

const refs = getRefs();
const filmsData = new FilmsData();
let filmObj = null;
let filmId = null;

export default function toggleModalFilm() {
  refs.gallery.addEventListener('click', openModalFilm);
  refs.closeModalBtn.addEventListener('click', closeModal);

  function openModalFilm(event) {
    const hasId = event.target.hasAttribute('data-id');
    filmId = event.target.dataset.id;
    if (event.target === event.currentTarget) return;
    else if (hasId === false) return;

    refs.modalFilmWrapper.innerHTML = '';
    document.addEventListener('keydown', closeModalOnEscape);
    refs.modal.addEventListener('click', closeModalOnBackdrop);

    toggleClasses();

    filmsData
      .getById(filmId, language)
      .then(filmProperties => {
        filmObj = filmProperties;
        renderModalMarkup(
          refs.modalFilmWrapper,
          markupModalCreating(filmProperties)
        );

        const addToWatched =
          refs.modalFilmWrapper.querySelector('.add-to-watched');
        const addToQueue = refs.modalFilmWrapper.querySelector('.add-to-queue');
        const trailerBtn =
          refs.modalFilmWrapper.querySelector('.trailer-play-btn');
        trailerBtn.addEventListener('click', onYouTubeBtnClick);

        if (fbFilmsAuth.isLogin) {
          addToWatched.classList.remove('visually-hidden');
          addToQueue.classList.remove('visually-hidden');
          addToWatched.addEventListener('click', onClickBtnWatched);
          addToQueue.addEventListener('click', onClickBtnQueue);
          return fbFilmsData.getFilmById(filmId);
        } else {
          document
            .querySelector('.need-register')
            .classList.remove('visually-hidden');
        }
      })
      .then(filmFromData => {
        const innerAddToWatched =
          refs.modalFilmWrapper.querySelector('.add-to-watched');
        const innerAddToQueue =
          refs.modalFilmWrapper.querySelector('.add-to-queue');

        if (filmFromData) {
          if (
            filmFromData?.place == PLACE_W ||
            filmFromData?.place2 == PLACE_W
          ) {
            removeMod(innerAddToWatched, 'watched');
          }
          if (
            filmFromData?.place == PLACE_Q ||
            filmFromData?.place2 == PLACE_Q
          ) {
            removeMod(innerAddToQueue, 'queue');
          }
        }
      })
      .catch(renderErrorModalMarkup);
  }

  async function onClickBtnWatched(event) {
    if (event.target.classList.contains('add-to-watched')) {
      const film1 = await filmsData.getById(filmId);
      const result = await fbFilmsData.writeTo(film1, 'WA');

      if (result?.place === 'WA' || result?.place2 === 'WA') {
        removeMod(event.target, 'watched');
      }

      // if (event.target.nextSibling.classList.contains('remove-from-queue')) {
      //   addMod(event.target.nextSibling, 'queue');
      // }
    } else if (event.target.classList.contains('remove-from-watched')) {
      const result = await fbFilmsData.removeFilm(filmId, 'WA');

      addMod(event.target, 'watched');
    }
  }

  async function onClickBtnQueue(event) {
    if (event.target.classList.contains('add-to-queue')) {
      const film1 = await filmsData.getById(filmId);
      const result = await fbFilmsData.writeTo(film1, 'QU');
      if (result?.place === 'QU' || result?.place2 === 'QU');
      removeMod(event.target, 'queue');
      // if (
      //   event.target.previousSibling.classList.contains('remove-from-watched')
      // ) {
      //   addMod(event.target.previousSibling, 'watched');
      // }
    } else if (event.target.classList.contains('remove-from-queue')) {
      const result = await fbFilmsData.removeFilm(filmId, 'QU');
      addMod(event.target, 'queue');
    }
  }

  function closeModal(event) {
    toggleClasses();
  }

  function closeModalOnEscape(event) {
    if (event.key !== 'Escape') return;

    toggleClasses();
    document.removeEventListener('keydown', closeModalOnEscape);
  }

  function closeModalOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;

    toggleClasses();
    refs.modal.removeEventListener('click', closeModalOnBackdrop);
  }

  function toggleClasses() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is_hidden');
  }

  function onYouTubeBtnClick(event) {
    trailerApiService.filmID = filmId;
    trailerApiService.showTrailer();
    closeModal();
  }
}

toggleModalFilm();
