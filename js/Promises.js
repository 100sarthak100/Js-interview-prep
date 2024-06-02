/**
 * Promise is an object, which represents a completion or
 * a failure of an operation. And also its value.
 */

/** Callback */
function getData(callback) {
  setTimeout(() => {
    const data = "Some data";
    callback(data);
  }, 1000);
}

getData((data) => {
  console.log("data", data);
});

/** Promises */
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Some data";
      resolve(data);
    }, 1000);
  });
}

getData()
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log(err);
  });
  

/** async/await */
async function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Some data";
      resolve(data);
    }, 1000);
  });
}

async function main() {
  const data = await getData();
  console.log(data);
}
main();


/** Promise APIs */
 // promise.all()



const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("val1");

    reject("err1")
  }, 3000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("val2");

    reject("err2")
  }, 1000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("val3");

    reject("err3")
  }, 2000)
})

// Promise.all([p1, p2, p3])
// .then((res) => {
//   console.group("res", res)
// })
// .catch((err) => {
//   console.log("err", err)
// })

// Promise.allSettled([p1, p2, p3])
// .then((res) => {
//   console.group("res", res)
// })
// .catch((err) => {
//   console.log("err", err)
// })

// Promise.race([p1, p2, p3])
// .then((res) => {
//   console.group("res", res)
// })
// .catch((err) => {
//   console.log("err", err)
// })

// Promise.any([p1, p2, p3])
// .then((res) => {
//   console.group("res", res)
// })
// .catch((err) => {
//   console.log("err", err)

//   console.log("err array", err.errors)
// })


/** async await */

// #####

async function getData() {
  return "hello";
}

const dataPromise = getData();
console.log("promise data", dataPromise)

dataPromise.then((res) => {
  console.log("promise res", res)
})

// #####

const pr = new Promise((resolve, reject) => {
  resolve("pr promise resolved")
})

async function getData2() {
  return pr;
}

const dataPre = getData2();
console.log("pr data", dataPre)

dataPre.then((res) => {
  console.log("pr res", res)
})











