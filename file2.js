uncompress('3(ab)') // 'ababab'
uncompress('3(ab2(c))') // 'abccabccabcc'

/**
 * @param {string} str
 * @returns {string}
 */
const isNumeric = (str) => {
    return !isNaN(parseFloat(str)) && isFinite(Number(str));
  }
  
  function uncompress(str) {
    const stack = [];
  
    for(const char of str) {
      if(char !== ")") {
        stack.push(char);
      } else {
        let word = "";
        let count = "";
  
        while(stack.length && stack[stack.length - 1] !== "(") {
          word = stack.pop() + word;
        }
  
        stack.pop();
  
        while(stack.length && isNumeric(stack[stack.length - 1])) {
          count = stack.pop() + count;
        }
  
        let num = Number(count);
        stack.push(word.repeat(num))
      }
    }
  
    return stack.join('');
  }

// move zeros
const list = [1,0,0,2,3]
moveZeros(list) 
console.log(list) // [1,2,3,0,0]

Time - O(n),
Space - inplace

/**
 * @param {Array<any>} list
 * @returns {void}
 */
function moveZeros(list) {
    let idx = 0;
  
    for(let i=0; i<list.length; i++) {
      if(list[i] !== 0) {
        list[idx] = list[i];
        idx++;
      }
    }
  
    while(idx < list.length) {
      list[idx] = 0;
      idx++;
    }
  }

// implement `_.set()`
const obj = {
    a: {
      b: {
        c: [1,2,3]
      }
    }
}

set(obj, 'a.b.c', 'BFE')
console.log(obj.a.b.c) // "BFE"

set(obj, 'a.b.c.0', 'BFE')
console.log(obj.a.b.c[0]) // "BFE"

set(obj, 'a.b.c[1]', 'BFE')
console.log(obj.a.b.c[1]) // "BFE"

set(obj, ['a', 'b', 'c', '2'], 'BFE')
console.log(obj.a.b.c[2]) // "BFE"

set(obj, 'a.b.c[3]', 'BFE')
console.log(obj.a.b.c[3]) // "BFE"

set(obj, 'a.c.d[0]', 'BFE')
// valid digits treated as array elements
console.log(obj.a.c.d[0]) // "BFE"

set(obj, 'a.c.d.01', 'BFE')
// invalid digits treated as property string
console.log(obj.a.c.d['01']) // "BFE"

function set<T extends object>(obj: T, path: string | string[], value: any) {
    path = Array.isArray(path) ? path :  path.replace('[', '.').replace(']', '').split('.');
    
    let src = obj;
    path.forEach((key, index, array) => {
      if(index === path.length - 1) {
        src[key] = value
      } else {
        if(!src.hasOwnProperty(key)) {
          const next = array[index + 1];
          src[key] = String(Number(next)) === next ? [] : {}
        }
  
        src = src[key]
      }
    })
    
  }

// implement Array.prototype.reduce()
// [1,2,3].myReduce((sum, item) => sum + item)
// 6
// copied from lib.es5.d.ts
declare interface Array<T> {
    myReduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    myReduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    myReduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U
  }
  
  Array.prototype.myReduce = function (...args: any[]) {
      const hasInitialValue = args?.length > 1;
      if(!hasInitialValue && this?.length === 0) {
        throw new Error;
      }
  
      let res = hasInitialValue ? args[1] : this[0];
  
      for(let i = hasInitialValue ? 0 : 1 ; i<this?.length; i++) {
        res = args?.[0](res, this[i], i, this)
      }
  
      return res;
  }

// the angle between hour hand and minute hand of a clock
angle('12:00')
// 0

angle('23:30')
// 165
/**
 * @param {string} time
 * @returns {number} 
 */
function angle(time) {
    let [hour, min] = time?.split(':').map((val) => parseInt(val));
  
    hour = hour >= 12 ? hour - 12 : hour;
  
    let hourAngle = 360 / 12; // 30*
    let minuteAngle = 360 / 60; // 6*
  
    /**
     * 1 hour = 60 min
     */
  
    let hoursInMin = min / 60;
  
    totalHour = hour + hoursInMin;
  
    finalHourAngle = totalHour * hourAngle;
    finalMinAngle = min * minuteAngle;
  
    let res = Math.abs(finalHourAngle - finalMinAngle);
  
    let finalAngle = res > 180 ? 360 - res : res;
  
    return Math.round(finalAngle)
  }

// Once function
// _.once(func) is used to force a function to be called only once, later 
// calls only returns the result of first call.
/**
 * @param {Function} func
 * @return {Function}
 */
function once(func) {
  let results = null;
  let isCalled = false;

  return function(...args) {
    if(!isCalled) {
      results = func.call(this, ...args);
      isCalled = true;
    }

    return results;
  }
}


// Quick Sort
/**
 * @param {number[]} arr
 * 
 * Time - O(n logn)
 */
function quickSort(arr, l=0, r=arr.length - 1) {
  if(l > r) return;

  const pivot = partition(arr, l, r);
  quickSort(arr, l, pivot - 1);
  quickSort(arr, pivot+1, r)

  return;
}

function partition(arr, l, r) {
  let pIndex = l;
  let pivot = arr[r];

  for(let i=l; i<r; i++) {
    if(arr[i] <= pivot) {
      [arr[i], arr[pIndex]] = [arr[pIndex], arr[i]];
      pIndex += 1;
    }
  }

  [arr[r], arr[pIndex]] = [arr[pIndex], arr[r]];
  return pIndex;
}