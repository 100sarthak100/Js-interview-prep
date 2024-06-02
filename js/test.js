function trailingDebounce(fn, delay) {
  let timerInstance;

  return function (args) {
    clearTimeout(timerInstance);

    timerInstance = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

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

function currying(fn) {

  return function curried(...args) {
    if(fn.length <= args.length) {
      return fn.call(this, ...args)
    } else {

      return function(...next) {
        return curried.call(this, ...args, ...next)
      }
    }
  }
}
