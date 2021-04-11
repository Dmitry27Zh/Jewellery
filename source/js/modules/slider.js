'use strict';

(function () {
  const slider = document.querySelector('.slider');
  const sliderWrapper = document.querySelector('.slider__wrapper');
  const slidesContainer = sliderWrapper.querySelector('.slider__list');
  const sliderPagination = slider.querySelector('.slider__pagination');
  const sliderButtonPrev = slider.querySelector('.slider__button-prev');
  const sliderButtonNext = slider.querySelector('.slider__button-next');

  const SliderMode = {
    PREV: 'prev',
    NEXT: 'next',
    PAGE: 'page',
  };

  const PAGES_QUANTITY = 3;
  const SLIDES_PER_SWITCH = 4;
  const TRANSITION_DURATION = 800;
  let isSliding = false;
  let moveLength = null;
  let currentTranslateValue = 0;
  let currentSlide = 0;

  const moveLengthPerc = 23.076 + 2.564;

  function getMoveLength() {
    moveLength = slidesContainer.offsetWidth * moveLengthPerc / 100 * SLIDES_PER_SWITCH;
  }

  function switchButtons() {
    if (currentSlide === PAGES_QUANTITY - 1) {
      sliderButtonNext.disabled = true;
    } else {
      sliderButtonNext.disabled = false;
    }
    if (currentSlide === 0) {
      sliderButtonPrev.disabled = true;
    } else {
      sliderButtonPrev.disabled = false;
    }
  }

  function switchPage(mode, page) {
    sliderPagination.children[currentSlide].classList.remove('slider__page--current');
    switch (mode) {
      case SliderMode.PREV:
        currentSlide--;
        break;
      case SliderMode.NEXT:
        currentSlide++;
        break;
      case SliderMode.PAGE:
        currentSlide = page;
    }
    sliderPagination.children[currentSlide].classList.add('slider__page--current');

  }

  function switchSlide(mode, page) {
    if (isSliding) {
      return;
    }
    isSliding = true;
    switchPage(mode, page);
    switchButtons();

    switch (mode) {
      case SliderMode.PREV:
        currentTranslateValue += moveLength;
        break;
      case SliderMode.NEXT:
        currentTranslateValue -= moveLength;
        break;
      case SliderMode.PAGE:
        currentTranslateValue = -page * moveLength;
    }

    slidesContainer.style.transitionDuration = TRANSITION_DURATION / 1000 + 's';
    slidesContainer.style.transform = `translateX(${currentTranslateValue}px)`;
    setTimeout(() => {
      isSliding = false;
      slidesContainer.style.transitionDuration = '0s';
    }, TRANSITION_DURATION);
  }

  function sliderResizeHandler() {
    getMoveLength();
    currentTranslateValue = -moveLength * currentSlide;
    slidesContainer.style.transform = `translateX(${currentTranslateValue}px)`;
  }

  getMoveLength();

  sliderButtonNext.addEventListener('click', () => {
    switchSlide(SliderMode.NEXT);
  });

  sliderButtonPrev.addEventListener('click', () => {
    switchSlide(SliderMode.PREV);
  });

  sliderPagination.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      switchSlide(SliderMode.PAGE, [...sliderPagination.children].indexOf(evt.target.parentElement));
    }
  });

  window.addEventListener('resize', sliderResizeHandler);
})();
