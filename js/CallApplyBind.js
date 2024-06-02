let obj = {
  a: 10,
  b: 15,
};

function addObj(c) {
  return this.a + this.b + c;
}

let a = addObj.call(obj, 10);
console.log("a", a);

let obj2 = {
  first: "John",
  last: "Doe",
  fullName: function () {
    return `${this.first} ${this.last}`;
  },
};

console.log(obj2.fullName());

let fullNameVal = obj2.fullName;
console.log(fullNameVal());
console.log(fullNameVal.call(obj2));

/**
 * to prove that functions are also objects
 * in js
 */
function greeting() {
  console.log("Hello World");
}

greeting.lang = "English";

// Prints 'English'
// console.log(greeting.lang);

/** Counter */
const counter = {
    count: 0,
    increamentCounter: function () {
        this.count++;
        console.log(this.count)
    }
}

let increamentCount = counter.increamentCounter.bind(counter);

document.getElementById("ClickMe").addEventListener('click', increamentCount)

// Polyfills

// Call
Function.prototype.myCall = function(context, ...args) {
  context.fn = this;
  context.fn(...args);
}

// Apply
Function.prototype.myApply = function(context, args) {
  context.fn = this;
  context.fn(...args);
}

// Bind
Function.prototype.myBind = function(context, ...args) {
  context.fn = this;
  
  return function (...next) {
    context.fn(...args, ...next);
  }
}

// call apply bind with object & arrow functions
const obj1 = {
  name: "Object 1",
  getName1: function() {
      console.log("name1 is", this.name)
  },
  getName2: () => {
       console.log("name2 is", this.name)
  },
  getName3: function() {
      let getName4 = () => {
          console.log("name3 is", this.name)
      }
      
      getName4()
  }
}

this.name = "Global name"

const obj2 = {
  name: "Object 2"
}

obj1.getName1.call(obj2)
obj1.getName2.call(obj2)
obj1.getName3.call(obj2)