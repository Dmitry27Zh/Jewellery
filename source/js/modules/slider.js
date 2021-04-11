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
    let currentSlide = 0;

    function getMoveLength() {
      currentBreakpoint = Object.keys(Breakpoints).find((breakpoint) => window.common.isInRange(Breakpoints[breakpoint], document.documentElement.clientWidth));
      moveLength = slidesContainer.offsetWidth * moveLengthPerc[currentBreakpoint] / 100 * slidesPerSwitch[currentBreakpoint];
    }

    function switchButtons() {
      if (currentSlide === pagesQuantity[currentBreakpoint] - 1) {
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

    function init() {
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
