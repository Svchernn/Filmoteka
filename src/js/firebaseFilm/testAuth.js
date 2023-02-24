import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { authMy } from './fbInit';
import { returnMessage } from '../dataStorage/errorsMessage';
import { renderLogin } from '../renderLogin/renderLogin';

export class FbFilmsAuth {
  constructor(user, language = 'en') {
    this.user = user;
    this.isLogin = !!user;
    this.language = language;
  }
  /**
   * @returns {String} имя авторизированного пользователя
   */
  getUserDisplayName() {
    if (this.isLogin) {
      return this.user.displayName
        ? this.user.displayName.length > 0
          ? this.user.displayName
          : this.user.email
        : this.user.email;
    }
    return '';
  }

  getUserUid() {
    if (this.isLogin) {
      return this.user?.uid;
    }
    return null;
  }
  /**
   * Вход
   * @param {String} email  не проверяет
   * @param {password} password
   * @returns {Promise} String  сообщение об ошибке
   */
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authMy,
        email,
        password
      );
      this.user = userCredential.user;
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }
  /**
   *
   * @param {String} email не проверяет
   * @param {String} password
   * @param {String} userName
   * @returns {Promise} String сообщение об ошибке
   */
  async singUp(email, password, userName = '') {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authMy,
        email,
        password
      );
      this.user = userCredential.user;
      if (userName.length > 0) {
      }
      await updateProfile(this.user, {
        displayName: userName,
        //photoURL: 'https://example.com/jane-q-user/profile.jpg',
      });
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }
  // Исключение
  /**
   *
   * @returns {Prommise} String сообщение об ошибке
   */
  async logOut() {
    //auth/user-not-found
    if (!this.isLogin) return '';
    try {
      await authMy.signOut();
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }
}

export const fbFilmsAuth = new FbFilmsAuth(null);

// Прослушивает авторизацию
authMy.onAuthStateChanged(user => {
  if (user) {
    fbFilmsAuth.user = user;
    fbFilmsAuth.isLogin = true;
  } else {
    fbFilmsAuth.user = null;
    fbFilmsAuth.isLogin = false;
  }
  renderLogin(fbFilmsAuth.isLogin, fbFilmsAuth.getUserDisplayName());
});
