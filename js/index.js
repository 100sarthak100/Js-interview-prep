/** Closure */
// function outtest() {
//     var c = 20;
//     function outter(b) {
//         var a = 10;

//         function inner() {
//             console.log("a", a, b, c)
//         }

//         return inner;
//     }

//     return outter;
// }

// const close = outtest()("hello");
// close();

// console.log("start");

function attachListener() {
  let count = 0;
  document.getElementById("ClickMe").addEventListener("click", () => {
    console.log("click calback", ++count);
  });
}

attachListener()

setTimeout(() => {
  console.log("timer callback");
}, 5000);

console.log("end");
