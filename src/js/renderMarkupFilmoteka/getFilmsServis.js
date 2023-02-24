import FilmsData from '../moviesAPI/filmsData';
import { getRefs } from '../refs';
import { tuiPagination } from '../pagination/pagination';
import { LStorage } from '../storage/localStorage';

const refs = getRefs();
const filmsData = new FilmsData();
export const lStorage = new LStorage();

const language = lStorage.get('language');

export class GetFilmsServis {
  constructor() {
    this.userRequest = '';
    this.nextPage = 1;
    this.currentPage = 0;
    this.totalResults = 0;
  }

  async getFilmsPopular() {
    try {
      const postersArr = await filmsData.getDayPopular(this.nextPage);
      this.totalResults = postersArr.total_results;
      tuiPagination(this.totalResults);
      return this.getPosterProp(postersArr.films);
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsPopularPag() {
    try {
      const postersArr = await filmsData.getDayPopular(
        this.currentPage,
        language
      );
      return this.getPosterProp(postersArr.films);
    } catch (err) {
      console.log(err);
    }
  }

  async getFilms() {
    try {
      const postersArr = await filmsData.getSearchQuery(
        this.userRequest,
        this.nextPage,
        language
      );
      this.totalResults = postersArr.total_results;
      tuiPagination(this.totalResults);
      return this.getPosterProp(postersArr.films);
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsPag(request) {
    try {
      const postersArr = await filmsData.getSearchQuery(
        request,
        this.currentPage,
        language
      );
      return this.getPosterProp(postersArr.films);
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsPopularRestart(page) {
    try {
      const postersArr = await filmsData.getDayPopular(page, language);
      this.totalResults = postersArr.total_results;
      tuiPagination(this.totalResults);
      return this.getPosterProp(postersArr.films);
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsRestart(request, page) {
    try {
      const postersArr = await filmsData.getSearchQuery(
        request,
        page,
        language
      );
      this.totalResults = postersArr.total_results;
      tuiPagination(this.totalResults);
      return this.getPosterProp(postersArr.films);
    } catch (err) {
      console.log(err);
    }
  }

  getPosterProp(arr) {
    const posterProperties = arr.map(
      ({ id, posters, title, genres, year, vote }) => ({
        id,
        posters,
        title,
        genres,
        year,
        vote,
      })
    );
    return posterProperties;
  }

  reset() {
    this.nextPage = 1;
    this.currentPage = 0;
    refs.gallery.innerHTML = '';
  }

  incrementPage() {
    this.nextPage += 1;
    this.currentPage += 1;
  }

  get request() {
    return this.userRequest;
  }

  set request(newUserRequest) {
    this.userRequest = newUserRequest;
  }

  changeLanguageEn() {
    lStorage.save('language', 'en');
  }

  changeLanguageRu() {
    lStorage.save('language', 'ru');
  }
}
