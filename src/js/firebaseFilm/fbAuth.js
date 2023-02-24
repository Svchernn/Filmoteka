import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
  updateProfile,
} from 'firebase/auth';

import { renderLogin } from '../renderLogin/renderLogin';
import { authMy } from './fbInit';
import { fbFilmsData } from './fbFilms';
import { returnMessage } from '../dataStorage/errorsMessage';

export class FbFilmsAuth {
  constructor(user, language = 'en') {
    console.log('constructor');
    this.user = user;
    this.isLogin = !!user;
    this.language = language;
  }
}

export const fbFilmsAuth = new FbFilmsAuth(null);
