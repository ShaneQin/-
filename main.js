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
