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
  };

  const PAGES_QUANTITY = 3;
  const SLIDES_PER_SWITCH = 4;
  const TRANSITION_DELAY = 800;
  let isSliding = false;
  let currentTranslateValue = 0;
  let currentSlide = 0;

  const moveLengthPerc = 23.076 + 2.564;
  const moveLength = slidesContainer.offsetWidth * moveLengthPerc / 100 * SLIDES_PER_SWITCH;

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

  function switchPage(mode) {
    sliderPagination.children[currentSlide].classList.remove('slider__page--current');
    switch (mode) {
      case SliderMode.PREV:
        currentSlide--;
        break;
      case SliderMode.NEXT:
        currentSlide++;
        break;
    }
    sliderPagination.children[currentSlide].classList.add('slider__page--current');

  }

  function switchSlide(mode) {
    isSliding = true;
    switch (mode) {
      case SliderMode.PREV:
        switchPage(mode);
        switchButtons();
        currentTranslateValue += moveLength;
        break;
      case SliderMode.NEXT:
        switchPage(mode);
        switchButtons();
        currentTranslateValue -= moveLength;
        break;
    }
    slidesContainer.style.transform = `translateX(${currentTranslateValue}px)`;
    setTimeout(() => {
      isSliding = false;
    }, TRANSITION_DELAY);
  }

  sliderButtonNext.addEventListener('click', () => {
    if (isSliding) {
      return;
    }
    switchSlide(SliderMode.NEXT);
  });

  sliderButtonPrev.addEventListener('click', () => {
    if (isSliding) {
      return;
    }
    switchSlide(SliderMode.PREV);
  });
})();
