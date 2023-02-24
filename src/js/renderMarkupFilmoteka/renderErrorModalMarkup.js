import { getRefs } from '../refs';

const refs = getRefs();

export default function renderErrorModalMarkup() {
  const errorMarkup = `<p class="error-text">
    Oops... <br />
    The page you requested could not be found...
  </p>`;

  return (refs.modalFilmWrapper.innerHTML = errorMarkup);
}
