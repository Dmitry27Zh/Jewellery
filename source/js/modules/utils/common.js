'use strict';

(function () {
  const isInRange = ([min, max = Infinity], number) => {
    return number >= min && number < max;
  };

  window.common = {
    isInRange,
  };
})();
