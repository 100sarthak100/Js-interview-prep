
/**
 * @param {any} data
 * @return {string}
 */
// JSON.stringify(str)
function stringify(data) {
    if ([NaN, null, undefined, Infinity].includes(data)) {
      return 'null';
    }
  
    if(typeof data === "bigint") {
      throw new Error("Cannot serialize bigint");
    } else if(typeof data === "function") {
      return undefined;
    } else if(typeof data === "string") {
      return `"${data}"`
    } else if(typeof data === "number") {
      return `${data}`;
    } else if(typeof data === "symbol") {
      return 'null';
    } else if(data !== data) {
      return 'null';
    } else if(typeof data === "boolean") {
      return `${data}`
    } else if(data instanceof Date) {
      return `"${data.toISOString()}"`;
    } else if(Array.isArray(data)) {
      const arr = data.map((el) => {
        if(el === undefined) {
          return 'null';
        } else {
          return stringify(el);
        }
      })
  
      return `[${arr.join(',')}]`
    } else if(typeof data === "object") {
      const arr = Object.entries(data).reduce((acc, [key, value]) => {
        if(value === undefined || stringify(value) === undefined) {
          return acc;
        }
  
        acc.push(`"${key}":${stringify(value)}`);
        return acc;
      }, [])
  
      console.log("arr", arr);
      return `{${arr.join(',')}}`;
    }
  }
  
  const obj = {
    a: 1,
    b: {
      c: 2,
    },
    d: 3
  }
  
  console.log(stringify(obj))

  



// JSON.parse(str)
  /**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
    if(str === '' || str[0] === "'") {
      throw Error();
    }
  
    if(str === 'null') {
      return null;
    }
  
    if(str === '{}') {
      return {}
    }
  
    if(str === '[]') {
      return []
    }
  
    if(str === 'false') return false;
    if(str === 'true') return true;
  
    if(str[0] === '"') {
      return str.slice(1, -1);
    }
  
    if(+str === +str) {
      return Number(str);
    }
  
    if(str[0] === "{") {
      const obj = str.slice(1, -1).split(',').reduce((acc, el) => {
        const index = el.indexOf(':');
        const key = el.slice(0, index);
        const value = el.slice(index+1);
        acc[parse(key)] = parse(value);
        return acc;
      }, {})
  
      return obj;
    }
  
    if(str[0] === "[") {
      const arr = str.slice(1, -1).split(',').map((val) => parse(val));
  
      return arr;
    }
  }