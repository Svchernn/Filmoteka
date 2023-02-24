import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Notification {
  constructor() {}

  successReg() {
    Notify.success('Registration completed successfully!');
  }

  errorReg() {
    Notify.failure('Registration error!');
  }

  // signIN notification
  loginSuccess() {
    Notify.success('You have successfully logged into your account:)');
  }

  loginError() {
    Notify.failure('No user found with this email and password');
  }

  // add/remove films
  successAddToWA() {
    Notify.success('The movie has been successfully added to the Watched');
  }

  removeFromWA() {
    Notify.info('The movie removed from Watched');
  }

  successAddToQU() {
    Notify.success('The movie has been successfully added to the Watched');
  }

  removeFromQU() {
    Notify.info('The movie removed from Watched');
  }
}

export const notification = new Notification();
