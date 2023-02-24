import { getRefs } from '../refs';
const refs = getRefs();

refs.modeButton.addEventListener('click', function () {
   if (document.body.classList.contains('moon')) {
     document.body.classList.remove('moon');
     refs.moon.classList.add('visually-hidden');
     refs.sun.classList.remove('visually-hidden');
     localStorage.setItem('mode', !'moon');
   } else {
      document.body.classList.add('moon');
      localStorage.setItem('mode', 'moon');
       refs.sun.classList.add('visually-hidden');
    refs.moon.classList.remove('visually-hidden');
   }
});

if (localStorage.getItem('mode') === 'moon') {
  document.body.classList.add('moon');
  refs.sun.classList.add('visually-hidden');
  refs.moon.classList.remove('visually-hidden');
}