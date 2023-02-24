// // Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './fireBaseData';
import { getDatabase } from 'firebase/database';

// Initialize Firebase
export const appMy = initializeApp(firebaseConfig);
export const authMy = getAuth(appMy);
export const filmsDatabase = getDatabase(appMy);
