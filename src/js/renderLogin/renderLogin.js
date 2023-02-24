import { async } from '@firebase/util';
import { login } from './isLogin';
import { showMessage } from './isLogin';

/**
 * Нужно дописать
 * @param {boolean} isLogin
 */
export function renderLogin(isLogin, user) {
  // console.log('RenderLoginMainPage =', isLogin, 'user=', user);

  if (document.querySelector('.header__nav-button-out')) {
    login(isLogin);
  }
  if (
    document.location.pathname === '/library.html' ||
    document.location.pathname === '/Filmoteka/library.html'
  ) {
    showMessage(isLogin);
  }
  if (document.querySelector('.need-register') && isLogin) {
    document.querySelector('.need-register').classList.add('visually-hidden');
  }
  showLibrary(isLogin);
}

function showLibrary(isLogin) {
  const el = document.querySelector('button.library-watched');
  if (el && isLogin) {
    el.click();
  }
}
