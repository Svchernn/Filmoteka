import { PLACE_Q } from '../firebaseFilm/fbFilms';
import { fbFilmsAuth } from '../firebaseFilm/testAuth';
import { getRefs } from '../refs';
import { spinnerOn, spinnerOff } from '../spiner/spiner';
import {
  markupCreating,
  renderMarkupList,
} from '../renderMarkupFilmoteka/renderMarkup';
import {
  emptyLibraryHide,
  emptyLibraryShow,
} from '../errors/showAndHideErrors';
import {
  makeNewArrProp,
  makeFilmsProperties,
  getFilmFromData,
} from './renderMarkupLibraryW';

const refs = getRefs();

refs.libraryBtnQ.addEventListener('click', renderMarkupLibraryQ);

// загрузка по кнопке очередь
export function renderMarkupLibraryQ() {
  refs.libraryBtnW.classList.remove('current-btn');
  refs.libraryBtnQ.classList.add('current-btn');
  if (fbFilmsAuth.isLogin) {
    refs.library.classList.add('min-height');
    spinnerOn();
    emptyLibraryHide();
    refs.library.innerHTML = '';
    getFilmFromData(PLACE_Q)
      .then(({ films }) => {
        return makeFilmsProperties(films);
      })
      .then(filmsProperties => {
        if (filmsProperties.length !== 0) {
          makeNewArrProp(filmsProperties);
          spinnerOff();
          renderMarkupList(refs.library, filmsProperties, markupCreating);
        }
        if (filmsProperties.length === 0) {
          refs.library.classList.remove('min-height');
          spinnerOff();
          emptyLibraryShow();
        }
      });
  }
}
