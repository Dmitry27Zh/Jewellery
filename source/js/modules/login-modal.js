'use strict';

(function () {
  const loginModalElement = document.querySelector('.login-modal');
  const loginModalCloseElement = loginModalElement && loginModalElement.querySelector('.login-modal__close');
  const loginModalOverlayElement = loginModalElement && loginModalElement.querySelector('.modal__overlay');
  const loginModalOpenElement = document.querySelector('.header__user-nav-link--login');
  const emailInputElement = loginModalElement && loginModalElement.querySelector('input[type="email"]');
  const loginFormElement = loginModalElement && loginModalElement.querySelector('.login-modal__form');

  let isStorageSupport = true;
  let storageEmail = null;

  try {
    storageEmail = localStorage.getItem('user-email');
  } catch (error) {
    isStorageSupport = false;
  }

  const loginFormSubmitHandler = function () {
    localStorage.setItem('user-email', emailInputElement.value);
  };

  if (loginModalElement && loginModalOpenElement && loginModalCloseElement && emailInputElement) {
    window.modal.init(loginModalElement, loginModalOpenElement, [loginModalCloseElement, loginModalOverlayElement], 'modal--opened', null, () => {
      emailInputElement.focus();

      if (isStorageSupport) {
        emailInputElement.value = storageEmail;
      }

      loginFormElement.addEventListener('submit', loginFormSubmitHandler);
    }, () => {
      loginFormElement.removeEventListener('submit', loginFormSubmitHandler);
    });
  }
})();
