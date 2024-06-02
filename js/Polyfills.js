// Call
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error("Not callable");
  }

  context.fn = this;
  context.fn(...args);
};

// Apply
Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error("Not callable");
  }

  if (!Array.isArray(args)) {
    throw new TypeError("Not callable on an object");
  }

  context.fn = this;
  context.fn(...args);
};

// Bind
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("Not callable");
  }

  context.fn = this;

  return function (...next) {
    context.fn(...args, ...next);
  };
};

// Map
Array.prototype.myMap = function(callback, context) {
  let res = [];
  
  for(let i=0; i<this.length; i++) {
      if(this.indexOf(this[i]) > -1) {
          res[i] = callback.call(context, this[i], i, this);
      }
  }
  
  return res;
}

/** map doesn't alter the empty spaces */

// Filter
Array.prototype.myFilter = function(callback, context) {
  let res = [];
  
  for(let index=0; index<this.length; index++) {
      if(callback.call(context, this[index], index, this)) {
          res.push(this[index])
      }
  }
  
  return res;
}

// Reduce
Array.prototype.myReduce = function (...args) {
  const hasInitialValue = args.length > 1;

  let acc = hasInitialValue ? args[1] : this[0];

  for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
    acc = args[0]?.(acc, this[i], i, this);
  }

  return acc;
};

// alternate reduce
Array.prototype.newReduce = function (callback, startingValue) {
  // as starting value is an optional param
  // make a check
  let accumulator = startingValue || undefined;
  for (let index = 0; index < this.length; index++) {
    if (accumulator) {
      accumulator = callback.call(accumulator, accumulator, this[index], index, this)
    } else {
      accumulator = this[index]
    }
  }
  return accumulator;
}

// Once
function once(fn, context) {
  let ran;

  return function (...args) {
    if (fn) {
      ran = fn.call(context || this, ...args);
      fn = null;
    }

    return ran;
  };
}

function hello(...args) {
  console.log("hello", ...args);
}

let newHello = once(hello);
// newHello(1, 2, 3)

// Memoize/Caching function
function myMemoize(fn, context) {
  const res = {};

  return function (...args) {
    let argsCache = JSON.stringify(args);

    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }

    return res[argsCache];
  };
}

// Promise polyfill (can be used both for series & async task)
Promise.allPollyFill = (promises) => {
  return new Promise((resolve, reject) => {
    let res = [];

    if(!promises.length) {
      resolve(res);
      return;
    }

    let pending = promises.length;

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then((ans) => {
          res[idx] = ans;
          pending--;

          if (pending === 0) {
            resolve(res);
            return;
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}

// Debounce
// Trailing
function debounce(fn, delay) {
  let timer;

  return function(...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay)
  }
}

// Leading
function debounce(fn, delay) {
  let timer;

  return function(...args) {
    if(!timer) {
      fn.call(this, ...args);
    }

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
    }, delay)
  }
}

// Throttle
function throttle(fn, delay) {
  let lastArgs = null;
  let waiting = false;

  function startCooldown() {
    setTimeout(() => {
      if(lastArgs) {
        fn.call(this, ...lastArgs)
        waiting = true;
        lastArgs = null;
        startCooldown();
      } else {
        waiting = false;
      }
    }, delay)
  }

  return function(...args) {
    if(!waiting) {
      fn.call(this, ...args);
      waiting = true;

      startCooldown.call(this)
    } else {
      lastArgs = args;
    }
  }
}

// Throttle alternate
function throttle(func, waitTime) {
  let lastTime = 0;

  return function(...args) {
    let now = new Date();

    if(now - lastTime >= waitTime) {
      lastTime = now;
      return func.call(this, ...args);
    }
  }
}

// Promises Polyfill
const STATE = {
  FULLFILLED: "fullfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};

class myPromise {
  state = STATE.PENDING;
  value;
  successCallbacks = [];
  failureCallbacks = [];

  constructor(executor) {
    this.onReject = this.onReject.bind(this);
    this.onResolve = this.onResolve.bind(this);

    executor(this.onResolve, this.onReject);
  }

  onResolve(value) {
    if (this.state !== STATE.PENDING) return;

    if (value instanceof myPromise) {
      value.then(this.onResolve, this.onReject);
      return;
    }

    this.state = STATE.FULLFILLED;
    this.value = value;

    this.runCallbacks();
  }

  onReject(value) {
    if (this.state !== STATE.PENDING) return;

    if (value instanceof myPromise) {
      value.then(this.onResolve, this.onReject);
      return;
    }

    this.state = STATE.REJECTED;
    this.value = value;

    this.runCallbacks();
  }

  runCallbacks() {
    if (this.state === STATE.FULLFILLED) {
      this.successCallbacks.forEach((cb) => {
        cb(this.value);
      });
    }

    if (this.state === STATE.REJECTED) {
      this.failureCallbacks.forEach((cb) => {
        cb(this.value);
      });
    }
  }

  then(resolveCb, rejectCb) {
      console.log("check", resolveCb, rejectCb)
    return new myPromise((resolve, reject) => {
      this.successCallbacks.push((val) => {
        try {
          resolve(resolveCb(val));
        } catch (error) {
          reject(error);
        }
      });

      this.failureCallbacks.push((val) => {
          if(!rejectCb) {
              reject(val);
              return;
          }
          
        try {
          resolve(rejectCb(val));
        } catch (error) {
          reject(error);
        }
      });

      this.runCallbacks();
    });
  }

  catch(rejectCb) {
    return this.then(undefined, rejectCb);
  }

  finally() {}
}

let p = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject("1");
  }, 400);
});

p.then((val) => {
  console.log("resolve 1", val);

  let newVal = val + "2";

  return newVal;
})
  .then((val) => {
    console.log("resolve 2", val);
  })
  .catch((err) => {
    console.log("err", err);
  });


// Flatten arr
const inputArray = [1, 2, [3, 4], 5, [[[6, 7], 8, [[[[9]]]]]]];

Array.prototype.myReverse = function() {
    let arr = this;
    let n = this.length;
    
    let i = 0;
    let j = n - 1;
    
    while(i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
    }
    
    return this;
}

function flatten(arr, depth = 1) {
    let result = [];
    let stack = [...arr].map((item) => [item, depth]);
    
    while(stack.length) {
        let [top, depth] = stack.pop();
        
        if(Array.isArray(top) && depth > 1) {
            stack.push(...top.map((item) => [item, depth - 1]));
        } else {
            result.push(top);
        }
    }
    
    return result.myReverse();
}

console.log(flatten(inputArray, 10))

// Array event listener
Array.prototype.pushWithEvent = function() {
  let size = this.length;
  
  let argsList = Array.prototype.slice.call(arguments);
  
  for(let index=0; index<argsList.length; index++) {
      this[size + index] = argsList[index];
  }
  
  this.triggerEvent('add', argsList)
}

Array.prototype.addListener = function(eventName, callback) {
  if(!this.listener) {
      this.listener = {};
  }
  
  if(!this.listener?.[eventName]) {
      this.listener[eventName] = [];
  }
  
  this.listener[eventName].push(callback)
}

// {
//     "event1": [cb1, cb2],
//     "event2": []
// }

Array.prototype.triggerEvent = function(eventName, argsList) {
  if(this.listener?.[eventName] && this.listener[eventName]?.length) {
      this.listener[eventName]?.forEach((cb) => {
          cb(argsList);
      })
  }
}

let arr = [];
arr.addListener('add', (argsList) => [
  console.log("args are added", argsList)    
])

arr.pushWithEvent(1, 2, 3, 4, 5, 6)

arr.pushWithEvent('asdasd')

console.log(arr)

// Event dispatcher class

class EventDispatcher {
  constructor() {
      this.listener = {};
  }
  
  addEventListener(eventName, callback) {
      if(!this.listener[eventName]) {
          this.listener[eventName] = []
      }
      
      if(this.listener[eventName].indexOf(callback) === -1) {
          this.listener[eventName].push(callback);
      }
  }
  
  removeEventListener(eventName, callback) {
      if(!this.listener[eventName]) {
          return;
      }
      
      let index = this.listener[eventName].indexOf(callback);
      
      if(index > -1) {
          this.listener[eventName].splice(index, 1);
      }
  }
  
  dispatch(eventName) {
      if(!this.listener[eventName] || !this.listener[eventName]?.length) {
          return;
      }
      
      let eventCopy = this.listener[eventName].slice(0);
      
      for(let i=0; i<eventCopy.length; i++) {
          eventCopy[i].call(this, eventName)
      }
  }
}

let ed = new EventDispatcher();

let event1 = 'my_event'

const callback = (eventName) => {
  console.log("this is a callback for event", eventName)
}

const callback2 = (eventName) => {
  console.log("this is a callback2 for event", eventName)
}

ed.addEventListener(event1, callback);
ed.addEventListener(event1, callback2);

console.log("ed", ed)

ed.dispatch(event1)

ed.removeEventListener(event1, callback)

console.log("ed", ed)


