// result values are not in order of the async tasks, they can be in any order, 
// depending which task completed first

function createAsyncTask() {
  let value = Math.floor(Math.random() * 10);

  return function (callback) {
    setTimeout(() => {
      callback(value);
    }, value * 1000);
  };
}

const asyncTaskList = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

function mainCallback(res) {
  console.log("res is", res);
}

function asyncParallel(asyncTaskList, mainCallback) {
  let res = [];
  let taskCompleted = 0;

  asyncTaskList.forEach((asyncTaskFunc, i) => {
    asyncTaskFunc((r) => {
      res.push({ res: r, index: i });
      taskCompleted++;

      if (taskCompleted >= asyncTaskList.length) {
        mainCallback.call(null, res);
      }
    });
  });
}

asyncParallel(asyncTaskList, mainCallback);

function asyncSeries(asyncTaskList, mainCallback) {
  let result = [];
  let taskCompleted = 0;
  
  asyncTaskList.reduce((acc, current, i) => {
      return acc.then((someVal) => {
          return new Promise((resolve, reject) => {
              current((res) => {
                  result.push({res, index: i});
                  taskCompleted++;
                  
                  if(taskCompleted >= asyncTaskList.length) {
                      mainCallback.call(null, result)
                  } else {
                      resolve(res);
                  }
              })
          })
      })
  }, Promise.resolve())
}