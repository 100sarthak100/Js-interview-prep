// function currying
function curry(fn) {
    return function curried(...args) {
      if(args.length >= fn.length) {
        return fn.call(this, ...args)
      } else {
        return curried.bind(this, ...args)

        // return function(...next) {
        //     return curried.call(this, ...args, ...next);
        // }
      }
    }
}

// function currying - alternative
function multiply(a, b) {
  return a * b;
}

function currying(fn) {
  return function curried(...args) {
    let val;

    return function (...next) {
      if (next?.length === 0) {
        return fn.call(this, ...args, 1);
      }

      val = curried.call(this, ...args, ...next)();
      return curried.call(this, val);
    };
  };
}

const curriedMul = currying(multiply);
console.log(curriedMul(2)(3)(4)(5)());

// trailing debounce
function debounce(func, wait) {
    let timerInstance;
    
    return function() {
      let context = this;
      args = arguments;
  
      clearTimeout(timerInstance)
  
      timerInstance = setTimeout(() => {
        func.apply(context, args)
        // func(...args)
      }, wait)
    }
  }

  // alternative trailing debounce
function debounce(func, delay) {
  let timerInstance;

  return function(args) {
    clearTimeout(timerInstance);
    timerInstance = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}

// leading debounce
function debounce(func, delay) {
  let timerInstance = null;

  return function(...args) {
    if(!timerInstance) {
      func.apply(this, args);
    }

    clearTimeout(timerInstance);
    timerInstance = setTimeout(() => {
      timerInstance = null;
    }, delay)
  }
}

// debounce enhanced (works for both leading & trailing)
function debounce(func, wait, option = {leading: false, trailing: true}) {
  let timerInstance = null;
  

  if(!option.leading && !option.trailing) {
    return () => null;
  }

  return function(...args) {
    let isInvoked = false;

    if(timerInstance === null && option.leading) {
      func.apply(this, args);
      isInvoked = true;
    }

    window.clearTimeout(timerInstance);

    timerInstance = window.setTimeout(() => {
      if(option.trailing && !isInvoked) {
        func.apply(this, args);
      }

      timerInstance = null;
    }, wait)

  }
}

// throttle
function throttle(func, wait) {
  let waiting = false;
  let lastArgs = null;

  function startCooling() {
    setTimeout(() => {
      if(lastArgs) {
        func.apply(this, lastArgs);
        lastArgs = null;
        startCooling();
      } else {
        waiting = false;
      }
    }, wait)
  }

  return function(...args) {
    if(!waiting) {
      func.apply(this, args);
      waiting = true;
      startCooling.call(this);
    } else {
      lastArgs = args;
    }
  }
}

// implement Array.prototype.flat()

// -> iterative
function flat(arr, depth = 1) {
    // [[1,1] [[2],1], [[3, [4]],1]]
    // [[[2],1], [[3, [4]],1]]
    // [[2,0], [[3, [4]],1]]
    // [[[3, [4]],1]]
    // [[3, 0], [[4], 0]]
    
    const result = []
    const stack = [...arr.map(item => ([item, depth]))]
    
    while (stack.length > 0) {
      const [top, depth] = stack.pop()
      if (Array.isArray(top) && depth > 0) {
        stack.push(...top.map(item => ([item, depth - 1])))
      } else {
        result.push(top)
      }
    }
    
    return result.reverse()
  }

// -> recursive
function flat(arr, depth = 1) {
    let result = [];
    arr.forEach(item => {
      if(Array.isArray(item) && depth > 0) {
        result.push(...flat(item, depth - 1));
      } 
      else result.push(item);
    });
    return result;
}

// -> recursive with reduce
function flat(arr, depth = 1) {
    return arr.reduce((acc, item) => {
      if (Array.isArray(item) && depth > 0) {
        acc.push(...flat(item, depth - 1))
      } else {
        acc.push(item)
      }
      return acc
    }, [])
}

// call, apply, bind
/**
 * used for function borrowing
 * call - args are provided seprately
 * apply - args are provided in array
 * bind - same as call, but returns the binded function
 */
 function print(city, state) {
    console.log(`${this.fName} ${this.lName} ${city} ${state}`)
}

const nameObject = {
    fName: 'Sarthak',
    lName: 'Naithani'
}

print.call(nameObject, 'Dehradun', 'UK')
print.apply(nameObject, ['Dehradun', 'UK'])
let newFunc = print.bind(nameObject, 'Dehradun', 'UK')
newFunc()

// find corresponding node in two identical DOM tree
/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
// iterative DFS approach using stack
 const findCorrespondingNode = (rootA, rootB, target) => {
    const stack = [[rootA, rootB]];
  
    while(stack.length > 0) {
      const [leftNode, rightNode] = stack.pop();
      if(leftNode === target) {
        return rightNode;
      }
  
      for(let i=0; i<leftNode.children.length; i++) {
        stack.push([leftNode.children[i], rightNode.children[i]])
      }
    }
  }

// implement clearAllTimeout()
(() => {
    const originSetTimeout = setTimeout;
    const originClearTimeout = clearTimeout;
    const timers = new Set();
    
    window.clearAllTimeout = () => {
      for (const timerId of timers) {
        clearTimeout(timerId);
      }
    }
  
    window.setTimeout = (callback, time, ...args) => {
      const callbackWrapper  = () => {
        callback(...args);
        timers.delete(timerId);
      }
      const timerId = originSetTimeout(callbackWrapper, time);
      timers.add(timerId);
      return timerId;
    }
  
    window.clearTimeout = (id) => {
      originClearTimeout(id);
      timers.delete(id);
    }
  })();

// undefined to null
/**
 * undefinedToNull({a: undefined, b: 'BFE.dev'})
// {a: null, b: 'BFE.dev'}

undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']})
// {a: ['BFE.dev', null, 'bigfrontend.dev']} 
 */
function undefinedToNull(arg) {
    if (typeof arg !== "object" || arg === null) {
      return arg;
    }
  
    for (const [key,value] of Object.entries(arg)) {
      if(value === undefined) {
        arg[key] = null;
      } else {
        arg[key] = undefinedToNull(value);
      }
    }
  
    return arg;
  }

// implement `Promise.all()`
function all(promises) {

    return new Promise((resolve, reject) => {
      let result = [];
  
      if (promises.length === 0) {
        resolve(result);
        return;
      }
  
      promises.forEach((p, index) => {
       Promise.resolve(p)
       .then((val) => {
          result.push(val);
          if(index === promises.length - 1) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    })
  }

// implement Array.prototype.map()
/**
 * map methods creates a new array and returns the new array
 * It calls the callbackFn once for each value
 * It doesnot call the callbackFn which doesnt have assigned values
 * in case of sparse array
 * It doesnot alter this
 * It is chainable
 */
Array.prototype.myMap = function(callback, context) {
    const length = this.length
    const result = new Array(this.length)
  
    for(let i=0; i<length; i++) {
      if(i in this) {
        // element, index, array
        const value = callback.call(context, this[i], i, this);
        result[i] = value;
      }
    }
  
    return result;
  }
  
let arr = new Array(5);
arr = []
arr[10] = 120;
  
let newArr = arr.myMap((val) => {
    return val * 2;
})
console.log(newArr)

// alternative
Array.prototype.myMap = function(callback, thisObj) {
    const result = [];
    this.forEach((...args) => {
      const index = args[1];
      result[index] = callback.apply(thisObj, args);
    })
    return result;
}

// forEach
/**
 * calls the callbackFn once for each value
 * returns undefined
 * it is not chainable
 * callbackFn is called only for assigned values
 * Doesnot mutate the array, but the callbackFn can do it
 * cannot break forEach loop
 * forEach excepts a synchrronous func, async and
 * promises doesn't work
 */

  // for...of and for...in
  /**
   * Both for..of and for..in statements iterate over lists; 
   * the values iterated on are different though, for..in returns 
   * a list of keys on the object being iterated, whereas for..of 
   * returns a list of values of the numeric properties of the object 
   * being iterated.
   */
   let list = [4, 5, 6];

   for (let i in list) {
      console.log(i); // "0", "1", "2",
   }
   
   for (let i of list) {
      console.log(i); // "4", "5", "6"
   }

// Array methods
/**
 * every -> check if every element passes the test
 * returns a boolean value
 * 
 * some -> check if atleasst 1 element passes the test
 * returns boolean
 * 
 * find -> returns first elements i the array which passes the test
 * if no value found return undefined
 * 
 * findIndex ->returns the index of first element in the array
 * which passes the test. if no element found returns -1
 */


/** Flatten nested object */
function flattenObject(obj) {
  let result = [];
  
  for(let key in obj) {
      if(typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          let temp = flattenObject(obj[key]);
          
          for(let nestedKey in temp) {
              result[`${key}.${nestedKey}`] = temp[nestedKey]
          }
      } else {
          result[key] = obj[key];
      }
  }
  
  return result
}

const nestedObject = {
a: 1,
b: {
  c: 2,
  d: {
    e: 3,
    f: 4,
  },
},
g: 5,
};

const flattenedObject = flattenObject(nestedObject);
console.log(flattenedObject);