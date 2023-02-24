import { SStorage } from "../storage/sessionStorage";
import { getRefs } from "../refs";

const sStorage = new SStorage();
const refs = getRefs();

refs.libraryLogo.addEventListener('click', onClickLogoLibrary)
export function onClickLogoLibrary() {
    sStorage.clear();
};