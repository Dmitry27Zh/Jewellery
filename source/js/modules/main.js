'use strict';

(function () {
  const loginModalElement = document.querySelector('.login-modal');
  const loginModalCloseElement = loginModalElement && loginModalElement.querySelector('.login-modal__close');
  const loginModalOverlayElement = loginModalElement && loginModalElement.querySelector('.modal__overlay');
  const loginModalOpenElement = document.querySelector('.header__user-nav-link--login');
  if (loginModalElement && loginModalOpenElement && loginModalCloseElement) {
    window.modal.init(loginModalElement, loginModalOpenElement, [loginModalCloseElement, loginModalOverlayElement], 'modal--opened');
  }
  const cartModalElement = document.querySelector('.cart-modal');
  const cartModalCloseElement = cartModalElement && cartModalElement.querySelector('.modal__close');
  const cartModalOverlayElement = cartModalElement && cartModalElement.querySelector('.modal__overlay');
  const productCardButton = document.querySelector('.product-card__button');

  if (cartModalElement && cartModalCloseElement && cartModalOverlayElement && productCardButton) {
    window.modal.init(cartModalElement, productCardButton, [cartModalCloseElement, cartModalOverlayElement], 'modal--opened');
  }

  const filterElement = document.querySelector('.filter');
  const filterOpenElement = document.querySelector('.filter__open');
  const filterCloseElement = document.querySelector('.filter__close');
  if (filterElement && filterOpenElement && filterCloseElement) {
    window.modal.init(filterElement, filterOpenElement, [filterCloseElement], 'filter--opened', 'filter--no-js');
  }
})();
