'use strict';

(function () {
  window.modal = {};

  window.modal.init = function (modalElement, openElement, closeElementsList, openedClassName, nojsClassName) {
    if (nojsClassName) {
      modalElement.classList.remove(nojsClassName);
    }

    openElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalElement.classList.add(openedClassName);
      document.body.classList.add('lock');

      function closeModal() {
        modalElement.classList.remove(openedClassName);
        document.body.classList.remove('lock');
        for (let closeElement of closeElementsList) {
          closeElement.removeEventListener('click', modalCloseClickHandler);
        }
        document.removeEventListener('keydown', keydownHandler);
      }

      const modalCloseClickHandler = closeModal;
      const keydownHandler = function (keyEvt) {
        if (keyEvt.key === 'Escape') {
          closeModal();
        }
      };

      document.addEventListener('keydown', keydownHandler);
      for (let closeElement of closeElementsList) {
        closeElement.addEventListener('click', modalCloseClickHandler);
      }
    });
  };
})();
