import Pagination from 'tui-pagination';
import { getRefs } from '../refs';
import { GetFilmsServis } from '../renderMarkupFilmoteka/getFilmsServis';
import { spinnerOn, spinnerOff } from '../spiner/spiner';
import { sStorage } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';
import {
  markupCreating,
  renderMarkupList,
} from '../renderMarkupFilmoteka/renderMarkup';
import { makeNewArrProp } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';

const refs = getRefs();

let userSettings = {};

export function tuiPagination(totalItems) {
  const options = {
    totalItems: totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(refs.tuiContainer, options);
  const getFilmsServis = new GetFilmsServis();

  pagination.on('afterMove', getPage);

  function getPage(e) {
    const currentPage = e.page;
    getFilmsServis.currentPage = currentPage;
    getFilmsServis.nextPage = currentPage + 1;
    userSettings = sStorage.get('userSettings');

    if (userSettings.request === '') {
      refs.gallery.innerHTML = '';
      spinnerOn();
      getFilmsServis.getFilmsPopularPag().then(posterProperties => {
        makeNewArrProp(posterProperties);
        spinnerOff();
        renderMarkupList(refs.gallery, posterProperties, markupCreating);
        userSettings.page = getFilmsServis.currentPage;
        userSettings.request = getFilmsServis.userRequest;
        sStorage.save('userSettings', userSettings);
      });
    }

    if (userSettings.request) {
      refs.gallery.innerHTML = '';
      spinnerOn();
      getFilmsServis
        .getFilmsPag(userSettings.request)
        .then(posterProperties => {
          makeNewArrProp(posterProperties);
          spinnerOff();
          renderMarkupList(refs.gallery, posterProperties, markupCreating);
          userSettings.page = getFilmsServis.currentPage;
          userSettings.request = userSettings.request;
          sStorage.save('userSettings', userSettings);
        });
    }
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }

  refs.search.addEventListener('submit', restartPag);

  function restartPag() {
    pagination.setItemsPerPage(1);
    userSettings.page = 1;
    sStorage.save('userSettings', userSettings);
  }

  userSettings = sStorage.get('userSettings');

  const page = pagination.getCurrentPage();
  if (page !== userSettings.page) {
    pagination.movePageTo(userSettings.page);
    userSettings.request = userSettings.request;
    sStorage.save('userSettings', userSettings);
  }
}
