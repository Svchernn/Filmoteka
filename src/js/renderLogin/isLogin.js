import { fbFilmsAuth } from '../firebaseFilm/testAuth';
import { getRefs } from '../refs';
import { needRegisterHide } from '../errors/needRegister';
import { needRegisterShow } from '../errors/needRegister';
import { emptyLibraryShow } from '../errors/showAndHideErrors';
const refs = getRefs();
hideButtons();

function hideButtons() {
  const els = [
    document.querySelector('.header__nav-item #signup'),
    document.querySelector('.header__nav-item #signin'),
    document.querySelector('.header__nav-autoriz#singout'),
  ];
  els.forEach(el => {
    if (el) {
      el.classList.add('visually-hidden');
    }
  });
}

export function login(isLogin) {
  if (isLogin) {
    refs.signOut.classList.remove('visually-hidden');
    refs.userIcon.classList.remove('visually-hidden');
    refs.signUp.classList.add('visually-hidden');
    refs.signIn.classList.add('visually-hidden');
    refs.signOut.addEventListener('click', logAut);
  } else if (!isLogin) {
    refs.signOut.classList.add('visually-hidden');
    refs.userIcon.classList.add('visually-hidden');
    refs.signUp.classList.remove('visually-hidden');
    refs.signIn.classList.remove('visually-hidden');
  }
}

async function logAut() {
  const result = await fbFilmsAuth.logOut();
}

export function showMessage(isLogin) {
  if (isLogin) {
    emptyLibraryShow();
  };
  if (!isLogin) {
    needRegisterShow();
  }
};
