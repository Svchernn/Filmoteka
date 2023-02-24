const needRegisterEl = document.querySelector('.need-register');

export function needRegisterShow() {
  needRegisterEl.classList.remove('no-display');
}

export function needRegisterHide() {
  needRegisterEl.classList.add('no-display');
}
