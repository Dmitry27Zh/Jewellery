'use strict';

(function () {
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
