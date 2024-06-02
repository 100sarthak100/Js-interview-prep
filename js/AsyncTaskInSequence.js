// Sequence
// maintains the result order
// total time taken 20secs
function createAsyncTask(wait) {
  let val = Math.floor(Math.random() * 10);

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(val);
      console.log("val", val, wait);
    }, wait * 1000);
  });
}

const asyncTaskList = [
  () => createAsyncTask(2),
  () => createAsyncTask(5),
  () => createAsyncTask(10),
  () => createAsyncTask(3),
];

function resolvePromise(taskList) {
  let result = [];
  let taskCompleted = 0;

  return new Promise((mainResolve, mainReject) => {
    taskList.reduce((acc, p, i) => {
      return acc.then((someVal) => {
        return new Promise((resolve, reject) => {
          p().then((res) => {
            result.push({
              res,
              idx: i,
            });

            taskCompleted++;

            if (taskCompleted >= taskList.length) {
              mainResolve(result);
            } else {
              resolve(res);
            }
          });
        });
      });
    }, Promise.resolve());
  });
}

console.time("PP");
resolvePromise(asyncTaskList).then((res) => {
  console.log("res", res);
  console.timeEnd("PP");
});

// #######################################################################
// Parallel
// Maintains the result order
// Total
function resolveInParallel(taskList) {
  return new Promise((resolve, reject) => {
    let n = taskList.length;
    let result = new Array(n);
    let taskCompleted = 0;

    if (!n) {
      resolve(result);
    }

    taskList.forEach((p, i) => {
      p().then((res) => {
        result[i] = {
          res,
          idx: i,
        };

        taskCompleted++;

        if (taskCompleted >= n) {
          resolve(result);
        }
      });
    });
  });
}

console.time("PP");
resolveInParallel(asyncTaskList).then((res) => {
  console.log("res", res);
  console.timeEnd("PP");
});
