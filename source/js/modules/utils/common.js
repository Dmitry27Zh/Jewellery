'use strict';

(function () {
  const isInRange = ([min, max = Infinity], number) => {
    return number >= min && number < max;
  };

  const isTouchDevice = () => {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  };

  window.common = {
    isInRange,
    isTouchDevice,
  };
})();
