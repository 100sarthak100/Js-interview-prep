/** only works for a specififc args length */
function curry(fn) {
  return function curried(...args) {
    if (args?.length >= fn?.length) {
      return fn.call(this, ...args);
    } else {
      // return curried.bind(this, ...args);

      return function(...next) {
          return curried.call(this, ...args, ...next);
      }
    }
  };
}

function mul(a, b, c, d) {
  return a + b + c + d;
}

let newFunc = curry(mul);
// console.log(newFunc(1)(2)(3)(4));

/** domain expansion: infinite currying
 * only works for multiply as we are using 1
 * for add use 0;
 *
 */
function infiniteCurrying(fn, constant) {
  return function curried(...args) {
    let val;

    return function (...next) {
      if (next.length === 0) {
        return fn.call(this, ...args, constant);
      }

      val = curried.call(this, ...args, ...next)();
      return curried.call(this, val);
    };
  };
}

function multiply(a, b) {
  return a * b;
}

function add(a, b) {
  return a + b;
}

const curriedMul = infiniteCurrying(multiply, 1);
const addMul = infiniteCurrying(add, 0);

console.log("curriedMul", curriedMul(2, 3)(4)());
console.log("addMul", addMul(2)(3)(4)(5)());

// alternate infinite currying
function infiniteSum(num) {
  let acc = num;
  
  return function adder(nextNum) {
      if(!nextNum) {
          return acc;
      }
      
      acc += nextNum;
      
      return adder;
  }
}

console.log(infiniteSum(2)(3)(100)())

// multi input infinite currying
function infiniteSum(...args) {
  let acc = args.reduce((a, b) => a + b, 0);
  
  return function adder(...next) {
      if(next.length === 0) {
          return acc;
      }
      
      acc += next.reduce((a, b) => a + b, 0);
      
      return adder;
  }
}

console.log(infiniteSum(2, 3, 4)(3)(100, 2)())




/// Main
function sum(...args) {
  let acc = args.reduce((a, b) => a + b, 0);
  
  return function adder(...next) {
      if(!next.length) {
          return acc;
      }
      
      let nextAcc = next.reduce((a, b) => a + b, 0);
      
      acc += nextAcc;
      
      adder.getResult = () => acc;
      
      return adder;
  }
}

console.log(sum(2, 3, 4)(4, 5, 6))


function sum(a, b, c, d) {
  return a + b + c + d
}

function currying(fn) {
  return function curried(...args) {
      if(args.length >= fn.length) {
          return fn.call(this, ...args)
      } else {
          return function (...next) {
              return curried.call(this, ...args, ...next);
          }
      }
  }
}

const curriedSum = currying(sum);

console.log(curriedSum(2)(3)(5)(6));
console.log(curriedSum(2)(3, 4)(5));
console.log(curriedSum(2)(3)(3, 5));


// curried sum function with fixed value
function curried(...args) {
  if(args?.length >= 4) {
      return args?.reduce((a, b) => a + b, 0);
  } else {
      return function(...next) {
          return curried.call(this, ...args, ...next);
      }
  }
}

console.log("check", curried(1)(2)(3)(4))