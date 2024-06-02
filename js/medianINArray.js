let arr = [];
let sum = 0;
let k = 3;

function getMean() {
  let input = prompt("Input value");

  let val = parseInt(input);

  sum += val;

  console.log("input", input, val);

  arr.push(val);

  if(arr.length > 3) {
    sum -= arr[0];
    arr.shift();
  }

  console.log(`Mean is: ${sum/arr.length}`)

//   getMean();
}

// getMean();

const userInput = document.getElementById("userInput");
const okButton = document.getElementById("okButton");

let arr2 = [];

let val = "";

// console.log("arr", arr2);

userInput.addEventListener("keydown", (e) => {
    // console.log("e", e.target.value)
    // val = e.target.value
})

okButton.addEventListener("click", (e) => {
    // console.log("e", e)
    arr2.push(parseInt(userInput.value))
    userInput.value = "";
    console.log("arr", arr2);
})