// Implement Array.prototype functions: map, reduce, filter, sort

/** ########################### MAP ############################### */

const arr = ["black", "pink", "white", "Green"];

const newArr = arr.map((element, index, array) => {
  return `${element}${element}`;
});
// console.log("newArr", newArr);

let filteredArr = arr.filter((item) => {
  return item !== "pink";
});
// console.log("filteredArr", filteredArr);

Array.prototype.myMap = function (callback) {
  const result = [];

  const len = this.length;

  for (let i = 0; i < len; i++) {
    let val = callback.call(this[i], i, this);
    result.push(val);
  }

  return result;
};

let arr1 = [1, 2, 3, null, undefined, , 5, 6];

let mArr1 = arr1.map((item) => item * 2);
// console.log("mArr1", mArr1);

let mArr2 = arr1.myMap((item) => item * 2);
// console.log("mArr2", mArr2);

/** ########################### REDUCE ############################### */

let arr2 = [1, 2, 3, 5, 6];

const reduceCallback1 = (acc, ele, index, array) => {
  // console.log(acc, ele, index, array);

  return acc + ele;
};

let accVal1 = arr2.reduce(reduceCallback1, 1);

// console.log("acc1", accVal1)

Array.prototype.myReduce = function (...args) {
  const hasInitialValue = args?.length > 1;

  if (!hasInitialValue && this?.length === 0) {
    throw new Error();
  }

  let acc = hasInitialValue ? args[1] : this[0];

  for (let i = hasInitialValue ? 0 : 1; i < this?.length; i++) {
    acc = args?.[0](acc, this[i], i, this);
  }

  return acc;
};

let accVal2 = arr2.myReduce(reduceCallback1, 1);

// console.log("acc2", accVal2)

/** ########################### FILTER ############################### */

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result1 = words.filter((word) => word.length > 6);

// console.log("filter 1", result1)

Array.prototype.myFilter = function (callbackFunc) {
  let filteredArr = [];

  for (let i = 0; i < this.length; i++) {
    let pass = callbackFunc.call(this[i], i, this);

    if (pass) {
      filteredArr.push(this[i]);
    }
  }

  return filteredArr;
};

const result2 = words.myFilter((word) => word.length > 6);

// console.log("filter 2", result2)

/** ################################## FLAT ############################# */
function flat(arr, depth = 1) {
  // [[1,1] [[2],1], [[3, [4]],1]]
  // [[[2],1], [[3, [4]],1]]
  // [[2,0], [[3, [4]],1]]
  // [[[3, [4]],1]]
  // [[3, 0], [[4], 0]]

  let result = [];

  const stack = [...arr.map((item) => [item, depth])];

  while (stack.length > 0) {
    const [top, depth] = stack.pop();

    if (Array.isArray(top) && depth > 0) {
      stack.push(...top.map((item) => [item, depth - 1]));
    } else {
      result.push(top);
    }
  }

  return result?.reverse();
}

const flatArr1 = [
  [1, 1],
  [2, [33, [44, 55]]],
  [4, 5],
];
// console.log(flat(flatArr1, 3))

// undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']})
// {a: ['BFE.dev', null, 'bigfrontend.dev']}
function undefinedToNull(arg) {
  if (typeof arg !== "object" || arg === null) {
    return arg;
  }

  console.log("arg", arg);

  for (const [key, value] of Object.entries(arg)) {
    console.log("key", key, value)
    if (value === undefined) {
      arg[key] = null;
    } else {
      arg[key] = undefinedToNull(value);
    }
  }

  return arg;
}


/** ####################### BIND ########################### */
/**
 * Polyfill is a fallback for a method that is not 
 * supported by the browser by default. 
 * */

/** 
 * Every object in JavaScript has a built-in property, which is called its prototype. 
 * The prototype is itself an object, so the prototype will have its own prototype, 
 * making what's called a prototype chain. 
 * The chain ends when we reach a prototype that has null for its own prototype.
*/

Function.prototype.myBind = function(context, ...args) {
  let fn = this;

  return function(...next) {
    return fn.call(context, ...args, ...next);
  }
}

/**
 * string, numbers & booleans are primitive data types & immutable
 * So we cannot add a proptery to them, but if we use new keyword
 * & make a string it will act as an object.
 * 
 * Functions, arrays & objects are mutable and act as a full fledges objects
 */

let s = "foo";
s.bar = "check"
let sString = new String("foo 2")
sString.bar = "check 3"
console.log("s", s, sString)

function func() {
  console.log("func called")
}

func.bar = "check 2"

console.log("s2", func, func.name)