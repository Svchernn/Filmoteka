import { fbFilmsData, PLACE_W } from '../firebaseFilm/fbFilms';
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

const refs = getRefs();

refs.libraryBtnW.addEventListener('click', renderMarkupLibraryW);

// загрузка по кнопке смотреть
export function renderMarkupLibraryW() {
  refs.libraryBtnW.classList.add('current-btn');
  refs.libraryBtnQ.classList.remove('current-btn');
  if (fbFilmsAuth.isLogin) {
    refs.library.classList.add('min-height');
    spinnerOn();
    emptyLibraryHide();
    refs.library.innerHTML = '';
    getFilmFromData(PLACE_W)
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

export async function getFilmFromData(place) {
  if (fbFilmsAuth.isLogin) {
    try {
      const films = await fbFilmsData.getFilms(place);
      if (films) {
        return films;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export function makeFilmsProperties(arr) {
  const filmsProperties = arr.map(
    ({ id, posters, title, genres, year, vote }) => ({
      id,
      posters,
      title,
      genres,
      year,
      vote,
    })
  );
  return filmsProperties;
}

// вспомогательные функции
export function makeNewArrProp(arr) {
  return arr.forEach(element => {
    if (element.genres.length === 1) {
      element.genres = [element.genres[0].name];
    }
    if (element.genres.length === 2) {
      element.genres = [element.genres[0].name, element.genres[1].name];
    }
    if (element.genres.length > 2) {
      element.genres = [
        element.genres[0].name,
        element.genres[1].name,
        'Other',
      ];
    }
  });
}
