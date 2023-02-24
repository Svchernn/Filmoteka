const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-footer-close]'),
  modal: document.querySelector('[data-modal-footer]'),
  modalOpenOverflow: document.querySelector("body"),
  
};



refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.modal.addEventListener('click', onBackdropClick);
  
function addHiddenBody() {
    refs.modalOpenOverflow.classList.add("modal-open");
}
  function removeHiddenBody() {
    refs.modalOpenOverflow.classList.remove("modal-open");
}
function onOpenModal() {
  refs.modal.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  addHiddenBody();
}

function onCloseModal() {
  refs.modal.classList.add('is-hidden');
removeHiddenBody();
  window.removeEventListener('keydown', onEscKeyPress);
  
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    refs.modal.classList.add('is-hidden');
      removeHiddenBody();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
    removeHiddenBody();
  }


}
