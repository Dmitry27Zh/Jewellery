'use strict';

(function () {
  const header = document.querySelector('.header');
  const toggleButton = header.querySelector('.header__toggle');

  if (header && toggleButton) {
    header.classList.remove('header--menu-opened');

    toggleButton.addEventListener('click', () => {
      header.classList.toggle('header--menu-opened');

      [...document.body.children].filter((element) => element !== header).forEach((element) => element.classList.toggle('inactive'));
    });
  }
})();

'use strict';

(function () {
  const accordions = document.querySelectorAll('.accordion');
  for (let accordion of accordions) {
    accordion.classList.remove('accordion--opened');

    accordion.children[0].addEventListener('click', () => {
      accordion.classList.toggle('accordion--opened');
    });
  }
})();

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

  sliderPagination.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      switchSlide(SliderMode.PAGE, [...sliderPagination.children].indexOf(evt.target.parentElement));
    }
  });
})();
