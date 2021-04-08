'use strict';

(function () {
  const header = document.querySelector('.header');
  const toggleButton = header.querySelector('.header__toggle');

  if (header && toggleButton) {
    header.classList.remove('header--menu-opened');

    toggleButton.addEventListener('click', () => {
      header.classList.toggle('header--menu-opened');
    });
  }
})();
