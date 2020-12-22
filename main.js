// 自己实现一个Promise
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  this.state = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => {
    throw r;
  }
  if (that.state === PENDING) {
    this.resolvedCallbacks.push(onFulfilled);
    this.rejectedCallbacks.push(onRejected);
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value);
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
}).then(value => {
  console.log(value);
});

// 自己实现一个call
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

// 自己实现一个apply
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}

// 自己实现一个bind
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Error');
  }
  const _this = this;
  const args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  }
}

// 自己实现一个new
function create() {
  let obj = {};
  let Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}

// 自己实现一个instanceof
function myInstanceof(left, right) {
  let prototype = right.prototype;
  left = left.__proto__;
  while (true) {
    if (left === null || left === undefined) {
      return false;
    }
    if (prototype === left) {
      return true;
    }
    left = left.__proto__;
  }
}

// 自己实现一个防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay);
  }
}

// 自己实现一个节流函数
function throttle(fn, delay) {
  let timer = null;
  let flag = true;
  return function (...args) {
    if (!flag) return;
    const context = this;
    flag = false;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
      flag = true;
    }, delay);
  }
}

// 自己实现一个柯里化函数
const curring = (fn, ...args) => fn.length > args.length ? (...arguments) => curring(fn, ...args, ...arguments) : fn(...args);

// 自己实现深拷贝函数
function deepClone(obj, map = new WeakMap()) {
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj == null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);
  const t = new obj.constructor();
  map.set(obj, t);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key], map);
    }
  }
  return t;
}
