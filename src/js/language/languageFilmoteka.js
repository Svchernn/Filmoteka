import { getRefs } from '../refs';
import { getFilmsServis } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';

const refs = getRefs();

refs.languageBtnEn.addEventListener('click', onClickEn);
refs.languageBtnRu.addEventListener('click', onClickRu);

function onClickEn() {
  getFilmsServis.changeLanguageEn();
  window.location.reload();
}
function onClickRu() {
  getFilmsServis.changeLanguageRu();
  window.location.reload();
}
