'use strict';

(function () {
  const Breakpoints = {
    MOBILE: [320, 768],
    TABLET: [768, 1024],
    DESKTOP: [1024],
  };

  const SliderMode = {
    PREV: 'prev',
    NEXT: 'next',
    PAGE: 'page',
  };

  window.const = {
    Breakpoints,
    SliderMode,
  };
})();

'use strict';

(function () {
  const isInRange = ([min, max = Infinity], number) => {
    return number >= min && number < max;
  };

  window.common = {
    isInRange,
  };
})();

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
  const SliderMode = window.const.SliderMode;
  const TRANSITION_DURATION = 800;
  const Breakpoints = window.const.Breakpoints;

  window.slider = function ({slidesContainer, sliderPagination, sliderButtonPrev, sliderButtonNext, moveLengthPerc, slidesPerSwitch, pagesQuantity}) {
    let isSliding = false;
    let moveLength = null;
    let currentBreakpoint = null;
    let currentTranslateValue = 0;
    let currentPage = 0;

    function getBreakpoint() {
      currentBreakpoint = Object.keys(Breakpoints).find((breakpoint) => window.common.isInRange(Breakpoints[breakpoint], document.documentElement.clientWidth));
    }

    function getMoveLength() {
      moveLength = slidesContainer.offsetWidth * moveLengthPerc[currentBreakpoint] / 100 * slidesPerSwitch[currentBreakpoint];
    }

    function switchButtons() {
      if (currentPage === pagesQuantity[currentBreakpoint] - 1) {
        sliderButtonNext.disabled = true;
      } else {
        sliderButtonNext.disabled = false;
      }
      if (currentPage === 0) {
        sliderButtonPrev.disabled = true;
      } else {
        sliderButtonPrev.disabled = false;
      }
    }

    function switchPage(mode, page) {
      sliderPagination.children[currentPage].classList.remove('slider__page--current');
      switch (mode) {
        case SliderMode.PREV:
          currentPage--;
          break;
        case SliderMode.NEXT:
          currentPage++;
          break;
        case SliderMode.PAGE:
          currentPage = page;
      }
      sliderPagination.children[currentPage].classList.add('slider__page--current');
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
      const lastBreakpoint = currentBreakpoint;
      getBreakpoint();
      const savedPage = Math.trunc(currentPage * slidesPerSwitch[lastBreakpoint] / slidesPerSwitch[currentBreakpoint]);
      if (lastBreakpoint !== currentBreakpoint && savedPage !== currentPage) {
        switchPage(SliderMode.PAGE, savedPage);
      }
      getMoveLength();
      currentTranslateValue = -moveLength * currentPage;
      slidesContainer.style.transform = `translateX(${currentTranslateValue}px)`;
    }

    function init() {
      getBreakpoint();
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
    }
    return function () {
      init();
    };
  };
})();

'use strict';

(function () {
  const slider = document.querySelector('.slider');
  const slidesContainer = slider.querySelector('.slider__list');
  const sliderPagination = slider.querySelector('.slider__pagination');
  const sliderButtonPrev = slider.querySelector('.slider__button-prev');
  const sliderButtonNext = slider.querySelector('.slider__button-next');

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
    }
  };

  const initSlider = window.slider(sliderSettings);
  initSlider();
})();
