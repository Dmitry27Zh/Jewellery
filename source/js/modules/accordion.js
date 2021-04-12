'use strict';

(function () {
  const accordions = document.querySelectorAll('.accordion');
  for (let accordion of accordions) {
    if (!accordion.classList.contains('accordion--no-close')) {
      accordion.classList.remove('accordion--opened');
    }

    accordion.children[0].addEventListener('click', () => {
      accordion.classList.toggle('accordion--opened');
    });
  }
})();
