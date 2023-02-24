import { getRefs } from '../refs';

const refs = getRefs();

export function searchErrorShow() {
  refs.searchError.classList.remove('no-display');
}

export function searchErrorHiden() {
  refs.searchError.classList.add('no-display');
}

export function emptyLibraryShow() {
  refs.emptyLibraryError.classList.remove('no-display');
}

export function emptyLibraryHide() {
  refs.emptyLibraryError.classList.add('no-display');
}
