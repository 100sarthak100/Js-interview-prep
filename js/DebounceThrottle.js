/** Trailing debounce */
function trailingDebounce(fn, delay) {
  let timerInstance;

  return function (...args) {
    clearTimeout(timerInstance);

    timerInstance = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/** Leading debounce */
function leadingDebounce(fn, delay) {
  let timerInstance;

  return function (...args) {
    if (!timerInstance) {
      fn.apply(this, args);
    }

    clearTimeout(timerInstance);

    timerInstance = setTimeout(() => {
      timerInstance = null;
    }, delay);
  };
}

/** leading + trailing debounce */
function advancedDebounce(fn, delay, isTrailing) {
  let timerInstance;

  return function (...args) {
    let isInvoked = false;

    if (!isTrailing && !isInvoked) {
      fn.apply(this, args);
      isInvoked = true;
    }

    clearTimeout(timerInstance);

    timerInstance = setTimeout(() => {
      if (isTrailing && !isInvoked) {
        fn.apply(this, args);
      }

      timerInstance = null;
    }, delay);
  };
}

const searchInput = document.getElementById("search");
const resultField = document.getElementById("result");

// console.log("check")

const onSearchInputChange = (e) => {
    // console.log("e", e);
  resultField.innerText += `${e.target.value}\n`;
};

const debouncedFunc = leadingDebounce(onSearchInputChange, 500);

searchInput.addEventListener("keydown", debouncedFunc);

/** Throttle */
function throttle(fn, delay) {
  let waiting = false;
  let lastArgs = null;

  function startCooling() {
    setTimeout(() => {
      if (lastArgs) {
        fn.apply(this, lastArgs);
        lastArgs = null;
        startCooling();
      } else {
        waiting = false;
      }
    }, delay);
  }

  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      startCooling.call(this);
    } else {
      lastArgs = args;
    }
  };
}


import React, { useRef, useEffect, useMemo } from "react";
import { debounce } from "../helper";

export const useDebounce = (callback, delay) => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedSearch = useMemo(() => {
    function fn(...args) {
      ref.current(...args);
    }

    return debounce(fn, delay);
  }, [delay]);

  return debouncedSearch;
};