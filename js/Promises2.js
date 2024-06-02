// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("promise resolved");
//   }, 5000);
// });

// function getData() {
//   // JS will not wait for promise to be resolved
//   p.then((res) => {
//     console.log("res", res);
//   });

//   console.log("After promise .then statement");
// }

// getData();

// async function handlePromise() {
//     // JS was waiting for promise to resolve
//     /**
//      * JS engine just appears to wait, it doesnot
//      * actually wait
//      */
//     const val = await p;
//     console.log("val", val)
// }

// handlePromise()

const API_URL = "https://api.github.com/users/100sarthak100";

async function getAPIData() {
  try {
    const data = await fetch(API_URL);

    const jsonValue = await data.json();

    console.log("jsonValue", jsonValue);
  } catch (error) {
    console.log("err", error);
  }
}

getAPIData();
