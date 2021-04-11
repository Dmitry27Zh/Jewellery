'use strict';

(function () {
  const SliderMode = window.const.SliderMode;
  const TRANSITION_DURATION = 800;
  const Breakpoints = window.const.Breakpoints;
  const TOUCH_DELAY = 300;
  const MIN_SWIPE_LENGTH = 50;

  window.slider = function ({slidesContainer, sliderPagination, sliderButtonPrev, sliderButtonNext, moveLengthPerc, slidesPerSwitch, pagesQuantity, paginationShortMode}) {
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
      if (paginationShortMode[currentBreakpoint]) {
        paginationShortMode[currentBreakpoint].textContent = currentPage + 1;
      }
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
      if (lastBreakpoint !== currentBreakpoint) {
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

    function swipeSlide(moveX) {
      if (moveX > 0 && currentPage !== 0) {
        switchSlide(SliderMode.PREV);
      }
      if (moveX < 0 && currentPage !== pagesQuantity[currentBreakpoint] - 1) {
        switchSlide(SliderMode.NEXT);
      }
    }

    function longTouchHandler(moveX) {
      slidesContainer.style.transform = `translateX(${currentTranslateValue}px)`;
      if (Math.abs(moveX) >= moveLength / 2) {
        swipeSlide(moveX);
      }
    }

    function touchStartHandler(startEvt) {
      const startCoord = {
        X: startEvt.touches[0].clientX,
        Y: startEvt.touches[0].clientY,
      };
      let move = {};
      let temporaryTranslateValue = currentTranslateValue;
      const startTime = new Date();
      let currentTime = null;

      function touchMoveHandler(moveEvt) {
        const newCoord = {
          X: moveEvt.touches[0].clientX,
          Y: moveEvt.touches[0].clientY,
        };
        move.X = newCoord.X - startCoord.X;
        move.Y = newCoord.Y - startCoord.Y;
        if (Math.abs(move.Y) > MIN_SWIPE_LENGTH) {
          return;
        }
        currentTime = new Date();
        if (currentTime - startTime >= TOUCH_DELAY) {
          slidesContainer.style.transform = `translateX(${temporaryTranslateValue + move.X}px)`;
        }
      }

      slidesContainer.addEventListener('touchmove', touchMoveHandler);
      slidesContainer.addEventListener('touchend', touchEndHandler);

      function touchEndHandler() {
        slidesContainer.removeEventListener('touchmove', touchMoveHandler);
        slidesContainer.removeEventListener('touchend', touchEndHandler);
        if (Math.abs(move.Y) > MIN_SWIPE_LENGTH) {
          slidesContainer.style.transform = `translateX(${currentTranslateValue}px)`;
          return;
        }
        if (currentTime - startTime < TOUCH_DELAY && Math.abs(move.X) >= MIN_SWIPE_LENGTH) {
          swipeSlide(move.X);
        } else {
          longTouchHandler(move.X);
        }
      }
    }
    return function () {
      init();
      if (currentBreakpoint === 'MOBILE') {
        slidesContainer.addEventListener('touchstart', touchStartHandler);
      }
    };
  };
})();
