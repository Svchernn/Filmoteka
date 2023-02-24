import { fbFilmsAuth } from './testAuth';
import { notification } from '../notifications/notifications';

const refs = {
  openLoginModalBtn: document.querySelector('#signin'),
  closeLoginModalBtn: document.querySelector('.modal-close-btn'),
  loginModal: document.querySelector('.login-data-modal'),
  openRegModalBtn: document.querySelector('#signup'),
  closeRegModalBtn: document.querySelector('.reg-modal-close'),
  regModal: document.querySelector('.reg-data-modal'),
};

function toggleClassLogModal() {
  document.body.classList.toggle('modal-open');
  refs.loginModal.classList.toggle('is_hidden');
}

function toggleLogModal() {
  refs.openLoginModalBtn.addEventListener('click', openLogModal);
  refs.closeLoginModalBtn.addEventListener('click', closeLogModal);

  function openLogModal(event) {
    document.addEventListener('keydown', closeLogModalonEscape);
    refs.loginModal.addEventListener('click', closeLogModalonBackdrop);
    toggleClassLogModal();
  }

  function closeLogModal(event) {
    toggleClassLogModal();
  }

  function closeLogModalonEscape(event) {
    if (event.key !== 'Escape') return;
    toggleClassLogModal();
    document.removeEventListener('keydown', closeLogModalonEscape);
  }

  function closeLogModalonBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    toggleClassLogModal();
    refs.loginModal.removeEventListener('click', closeLogModalonBackdrop);
  }
}
toggleLogModal();

function toggleClassRegModal() {
  refs.regModal.classList.toggle('is_hidden');
  document.body.classList.toggle('modal-open');
}

function toggleRegModal() {
  refs.openRegModalBtn.addEventListener('click', openRegModal);
  refs.closeRegModalBtn.addEventListener('click', closeRegModal);

  function openRegModal(event) {
    document.addEventListener('keydown', closeRegModalonEscape);
    refs.regModal.addEventListener('click', closeRegModalonBackdrop);
    toggleClassRegModal();
  }

  function closeRegModal(event) {
    toggleClassRegModal();
  }

  function closeRegModalonEscape(event) {
    if (event.key !== 'Escape') return;
    toggleClassRegModal();
    document.removeEventListener('keydown', closeRegModalonEscape);
  }

  function closeRegModalonBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    toggleClassRegModal();
    refs.regModal.removeEventListener('click', closeRegModalonBackdrop);
  }
}
toggleRegModal();

const formLog = document.querySelector('.login-form');
const formReg = document.querySelector('.reg-form');
const userEmail = document.querySelector('.login-email');
const userPassw = document.querySelector('.login-password');
const regName = document.querySelector('.reg-name');
const regEmail = document.querySelector('.reg-email');
const regPassw = document.querySelector('.reg-password');

formLog.addEventListener('submit', logSubmit);
formReg.addEventListener('submit', regSubmit);

async function exampleLogin(userMail, userPassword) {
  const email = userMail;
  const password = userPassword;
  const result = await fbFilmsAuth.login(email, password);
  if (result !== '') {
    notification.loginError();
  } else {
    notification.loginSuccess();
  }
  // console.log(result);
  // console.log(fbFilmsAuth.getUserDisplayName());
}

async function exampleRegistration(regName, regMail, regPassword) {
  const email = regMail;
  const password = regPassword;
  const user = regName;
  const result = await fbFilmsAuth.singUp(email, password, user);
  if (result !== '') {
    notification.errorReg();
  } else {
    notification.successReg();
  }

  // console.log(result);
  // console.log(fbFilmsAuth.getUserDisplayName());
}

function logSubmit(event) {
  event.preventDefault();
  const userMail = userEmail.value;
  const userPassword = userPassw.value;
  exampleLogin(userMail, userPassword);

  event.currentTarget.reset();

  toggleClassLogModal();
}

function regSubmit(event) {
  event.preventDefault();
  const userRegName = regName.value;
  const userRegMail = regEmail.value;
  const userRegPassw = regPassw.value;
  exampleRegistration(userRegName, userRegMail, userRegPassw);
  event.currentTarget.reset();
  toggleClassRegModal();
}
