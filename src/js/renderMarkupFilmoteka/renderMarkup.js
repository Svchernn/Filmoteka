// рендерит разметку в галлерею
export function renderMarkupList(element, imgArr, markupCreating) {
    element.insertAdjacentHTML('beforeend', imgArr.map(markupCreating).join('')) ; 
};

// изменяет первую букву строки на заглавную
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// принимает объект возвращает разметку одной карточки
export function markupCreating({ id, posters, title, genres, year, vote }) {
   
  if (posters[3].path !== 'https://image.tmdb.org/t/p/w342/null' && posters[4].path !== 'https://image.tmdb.org/t/p/w500/null' && posters[5].path !== 'https://image.tmdb.org/t/p/w780/null' && genres.length > 0) {
    
      const str = genres.join(', ');
      const letter = str[0].toUpperCase();
      const genr = str.replaceAt(0, letter);

      return `
    <div class="gallery-poster-box">
    <div class="gallery-poster">
    <picture>
          <source
            srcset="
              ${posters[4].path} 1x,
              ${posters[5].path} 2x
            "
            media="(min-width: 1200px)"
          />
          <source
            srcset="
              ${posters[3].path} 1x,
              ${posters[4].path} 2x
            "
            media="(min-width: 768px)"
          />
          <source
            srcset="
              ${posters[4].path} 1x,
              ${posters[4].path} 2x
            "
            media="(max-width: 767px)"
          />
          <img
            class="gallery-poster-img"
            src="${posters[4].path}"
            alt="${title}"
            data-id=${id}
            loading="lazy"
          />
    </picture>
    </div>
    <h2 class="gallery-poster-title" data-id=${id}>${title}</h2>
    <div class="gallery-poster-description">
      <p class="gallery-poster-text" data-id=${id}>${genr}
        <span class="date-befor">${year}</span>
        <div class="film-rating-wrapper">
      <p class="film-rating">${vote}</p>
        </div>
      </p>
    </div>
    </div>
    `
  }  
};

