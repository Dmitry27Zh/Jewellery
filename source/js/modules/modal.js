'use strict';

(function () {
  window.modal = {};

  window.modal.init = function (modalElement, openElement, closeElementsList, openedClassName, nojsClassName, cbOnOpen, cbOnClose) {
    if (nojsClassName) {
      modalElement.classList.remove(nojsClassName);
    }

    const inputElements = modalElement.querySelectorAll('input');
    let isInputInFocus = false;

    const inputFocusHandler = function () {
      isInputInFocus = true;
    };

    const inputBlurHandler = function () {
      isInputInFocus = false;
    };

    openElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalElement.classList.add(openedClassName);
      document.body.classList.add('lock');

      for (let input of inputElements) {
        input.addEventListener('focus', inputFocusHandler);
        input.addEventListener('blur', inputBlurHandler);
      }

      if (cbOnOpen) {
        cbOnOpen();
      }

      function closeModal() {
        modalElement.classList.remove(openedClassName);
        document.body.classList.remove('lock');

        for (let closeElement of closeElementsList) {
          closeElement.removeEventListener('click', modalCloseClickHandler);
        }

        for (let input of inputElements) {
          input.removeEventListener('focus', inputFocusHandler);
          input.removeEventListener('blur', inputBlurHandler);
        }

        document.removeEventListener('keydown', keydownHandler);

        if (cbOnClose) {
          cbOnClose();
        }
      }

      const modalCloseClickHandler = closeModal;
      const keydownHandler = function (keyEvt) {
        if (keyEvt.key === 'Escape') {
          closeModal();
        }
        if (keyEvt.key === 'x' && !isInputInFocus) {
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
