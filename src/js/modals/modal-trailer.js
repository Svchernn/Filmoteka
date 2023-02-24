import { getRefs } from '../refs';

import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import { MOVIES_API_KEY } from '../moviesAPI/filmsData';
const APIKEY_TRAILER = 'c1b8c874be54ebc5c34c225dbd6a36f5';

const refs = getRefs();

export default class TrailerApiService {
  constructor() {
    this.filmID = 0;
  }

  async showTrailer() {
    try {
      const data = await this.fetchTrailer();

      if (data.length === 0 || data === undefined) {
        console.log(data.length);
        alert('Sorry, trailer not found.');
        return;
      }

      let key = '';
      data.forEach(element => {
        if (element.type === 'Trailer') {
          if (element.name.includes('Official')) {
            key = element.key;
            return;
          }
        }
      });

      if (!key) {
        key = data[0].key;
      }

      const instance = basicLightbox.create(`
                <div>
                    <iframe class="youtube-modal" src="https://www.youtube.com/embed/${key}" frameborder="0" allowfullscreen></iframe>
                </div>
            `);

      instance.show();
    } catch (error) {
      alert('Sorry, trailer not found.');
    }
  }

  async fetchTrailer() {
    const URL = `https://api.themoviedb.org/3/movie/${this.filmID}/videos?api_key=${APIKEY_TRAILER}&language=en-US`;
    const response = await axios.get(URL);
    return response.data.results;
  }
}
