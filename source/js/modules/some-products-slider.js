'use strict';

(function () {
  const slider = document.querySelector('.some-products__slider');
  if (!slider) {
    return;
  }
  const slidesContainer = slider.querySelector('.slider__list');
  const sliderPagination = slider.querySelector('.slider__pagination');
  const sliderButtonPrev = slider.querySelector('.slider__button-prev');
  const sliderButtonNext = slider.querySelector('.slider__button-next');
  const sliderPaginationShort = slider.querySelector('span');

  const sliderSettings = {
    slidesContainer,
    sliderPagination,
    sliderButtonPrev,
    sliderButtonNext,
    moveLengthPerc: {
      DESKTOP: 23.076 + 2.564,
      TABLET: 47.787 + 4.424,
      MOBILE: 44.827 + 10.344,
    },
    slidesPerSwitch: {
      DESKTOP: 4,
      TABLET: 2,
      MOBILE: 2,
    },
    pagesQuantity: {
      DESKTOP: 3,
      TABLET: 6,
      MOBILE: 6,
    },
    paginationShortMode: {
      DESKTOP: false,
      TABLET: false,
      MOBILE: sliderPaginationShort,
    }
  };

  const initSlider = window.slider(sliderSettings);
  initSlider();
})();
