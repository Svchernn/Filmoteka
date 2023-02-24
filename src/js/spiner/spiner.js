import { getRefs } from '../refs';

const refs = getRefs();

export function spinnerOn() {
  refs.spinner.classList.remove('no-display');
}
export function spinnerOff() {
  refs.spinner.classList.add('no-display');
}
