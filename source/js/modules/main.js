'use strict';

(function () {
  const filterElement = document.querySelector('.filter');
  const filterOpenElement = document.querySelector('.filter__open');
  const filterCloseElement = document.querySelector('.filter__close');
  if (!filterElement || !filterOpenElement || !filterCloseElement) {
    return;
  }
  window.modal.init(filterElement, filterOpenElement, filterCloseElement, 'filter--opened', 'filter--no-js');
})();
