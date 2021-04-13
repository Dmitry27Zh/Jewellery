'use strict';

(function () {
  window.modal = {};

  window.modal.init = function (modalElement, openElement, closeElement, openedClassName, nojsClassName) {
    modalElement.classList.remove(nojsClassName);
    openElement.addEventListener('click', function () {
      modalElement.classList.add(openedClassName);
      document.body.classList.add('lock');
      closeElement.addEventListener('click', modalCloseClickHandler);
    });

    function modalCloseClickHandler() {
      modalElement.classList.remove(openedClassName);
      document.body.classList.remove('lock');
      closeElement.removeEventListener('click', modalCloseClickHandler);
    }
  };
})();
