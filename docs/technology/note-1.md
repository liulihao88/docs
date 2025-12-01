# 1. 技术点

## 1. 手写 call 函数

```javascript
/**
 * 手写的 call 函数
 * @param {*} context this 要绑定的对象
 * @param  {...any} args 传递给函数的参数列表
 * @returns {*} 函数调用的返回值
 */
Function.prototype.myCall = function (context, ...args) {
  // 1. 如果 myCall 不是在函数上调用，则报错
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  // 2. 处理 context 为 null 或 undefined 的情况，将其指向全局对象
  const ctx = context || (typeof window !== "undefined" ? window : globalThis);

  // 3. 创建一个唯一的属性名，以避免覆盖 ctx 上原有的属性
  // 使用 Symbol 是最安全的方式
  const fnKey = Symbol("call_key");

  // 4. 将当前函数（this）作为 ctx 的一个临时方法
  ctx[fnKey] = this;

  // 5. 调用这个临时方法，并传入参数
  const result = ctx[fnKey](...args);

  // 6. 调用完毕后，删除这个临时方法，保持 ctx 对象的纯净
  delete ctx[fnKey];

  // 7. 返回函数调用的结果
  return result;
};
```

测试用例

```javascript
// --- 测试用例 ---

// 1. 普通对象
const person = {
  name: "Alice",
  greet: function (greeting, punctuation) {
    return `${greeting}, I am ${this.name}${punctuation}`;
  }
};

const bob = { name: "Bob" };

// 使用 myCall 调用 person.greet, 并将 this 绑定到 bob
const greetingFromBob = person.greet.myCall(bob, "Hello", "!");
console.log(greetingFromBob); // 输出: "Hello, I am Bob!"

// 2. 处理 this 为 null/undefined
const globalGreet = function () {
  // 在浏览器中，this 指向 window 对象
  console.log(`Global this is: ${this}`);
  return `Called from global: ${this === window}`;
};

// 在浏览器中执行，this 应该指向 window
console.log(globalGreet.myCall(null)); // 输出: "Called from global: true"
// console.log(window.myCallNullResult); // 可以通过 window.myCallNullResult 验证，但我们代码里没用，所以注释掉

// 在 Node.js 中执行，this 应该指向 globalThis
// console.log(globalGreet.myCall.call(globalGreet, null)); // 稍微有点绕，但目的是在 Node.js 环境

// 3. 没有传递参数
const sayName = function () {
  return this.name;
};
const name = sayName.myCall(bob);
console.log(name); // 输出: "Bob"

// 4. 传入的函数没有返回值
const logThis = function () {
  console.log("this inside logThis is:", this);
};
logThis.myCall({ id: 123 }); // 输出: "this inside logThis is: { id: 123 }"
console.log(logThis.myCall({ id: 123 })); // 输出: undefined

// 5. 确保 ctx 对象未被污染
const cleanObj = { a: 1, b: 2 };
(function () {}).myCall(cleanObj, "test");
console.log(cleanObj); // 输出: { a: 1, b: 2 } (没有新增任何属性)
```

## 2. 手写 apply 函数

手写 apply 函数。apply 和 call 的功能几乎完全一样，它们都是用来改变一个函数内部的 this 指向。

唯一的区别在于它们如何传递参数：

call(thisArg, arg1, arg2, ...): 接收一个参数列表。

apply(thisArg, [arg1, arg2, ...]): 接收一个参数数组。

这个区别意味着 myApply 的实现会比 myCall 少一个 ...args 的解构过程，但核心思想是完全一致的。

```javascript
/**
 * 手写的 apply 函数
 * @param {*} context this 要绑定的对象
 * @param {Array<any>} args 传递给函数的参数数组
 * @returns {*} 函数调用的返回值
 */
Function.prototype.myApply = function (context, args) {
  // 1. 如果 myApply 不是在函数上调用，则报错
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }

  // 2. 处理 context 为 null 或 undefined 的情况，将其指向全局对象
  // 同时处理 args 不是数组或类数组对象的情况 (这是原生 apply 的行为)
  if (args === undefined || args === null) {
    // 如果 args 未提供或为 null/undefined，我们将其视为一个空数组
    args = [];
  }
  if (!Array.isArray(args) && typeof args.length !== "number") {
    // 如果 args 不是数组且没有 length 属性，也视为空数组
    // 这是为了模拟原生 apply 在第二个参数不是类数组对象时的行为
    args = [];
  }

  const ctx = context || (typeof window !== "undefined" ? window : globalThis);

  // 3. 创建一个唯一的属性名，以避免覆盖 ctx 上原有的属性
  const fnKey = Symbol("apply_key");

  // 4. 将当前函数（this）作为 ctx 的一个临时方法
  ctx[fnKey] = this;

  // 5. 调用这个临时方法，并传入参数数组
  const result = ctx[fnKey](...args);

  // 6. 调用完毕后，删除这个临时方法，保持 ctx 对象的纯净
  delete ctx[fnKey];

  // 7. 返回函数调用的结果
  return result;
};
```

测试用例

```javascript
// --- 测试用例 ---

// 1. 普通对象
const person = {
  name: "Alice",
  greet: function (greeting) {
    console.log(`73 greeting`, greeting);
    return `${greeting[0]}, I am ${this.name}${greeting[1]}`;
  }
};

const bob = { name: "Bob" };

// 使用 myApply 调用 person.greet, 传递参数数组
const greetingFromBob = person.greet.myApply(bob, ["Hello", "!"]);
console.log(greetingFromBob); // 输出: "Hello, I am Bob!"

// 2. 没有传递参数 args
const sayName = function () {
  return this.name;
};
const name = sayName.myApply(bob);
console.log(name); // 输出: "Bob"

// 3. 传入的函数没有返回值
const logThis = function () {
  console.log("this inside logThis is:", this);
};
logThis.myApply({ id: 123 }); // 输出: "this inside logThis is: { id: 123 }"
console.log(logThis.myApply({ id: 123 })); // 输出: undefined

// 4. 确保 ctx 对象未被污染
const cleanObj = { a: 1, b: 2 };
(function () {}).myApply(cleanObj, ["test"]);
console.log(cleanObj); // 输出: { a: 1, b: 2 }

// 5. **关键测试**: 处理 args 为 null/undefined 的情况
const returnArgs = function () {
  console.log(`27 arguments`, arguments);
  return arguments; // 返回一个 Arguments 对象 (类数组)
};
const nullArgsResult = returnArgs.myApply(null, null);
console.log(`27 nullArgsResult.length`, nullArgsResult.length);

const undefinedArgsResult = returnArgs.myApply(null, undefined);
console.log(undefinedArgsResult.length); // 输出: 1

// 6. **关键测试**: 处理 args 为非数组对象的情况 (但有 length)
// 模拟了一个类数组对象
const pseudoArgs = { 0: "Hi", 1: "there", length: 2 };
const pseudoArrayResult = person.greet.myApply(bob, pseudoArgs);
console.log(pseudoArrayResult); // 输出: "Hi, I am Bobthere"

// 7. **关键测试**: 处理 args 为非数非类数组对象的情况
const invalidArgs = { prop: "value" };
const invalidArgsResult = person.greet.myApply(bob, invalidArgs);
console.log(invalidArgsResult); // 应该等同于没有传参，所以输出: "undefined, I am Bobundefined"
// 或者更精确地处理，根据我们代码的逻辑，args 会被设为 []，所以：
// 输出: "undefined, I am Bobundefined" （因为 greeting 和 punctuation 都是 undefined）
// 修改我们的代码，如果 args 无效，直接当空数组用：
// 如果我们修改 myApply 的 args 处理逻辑为：
// args = Array.isArray(args) ? args : [];
// 那么这里就会输出 "undefined, I am Bobundefined"
// 我们现在的代码会将其变为空数组, 所以结果是:
console.log("---");
console.log(person.greet.myApply(bob, invalidArgs)); // 将输出 "undefined, I am Bobundefined"
console.log(person.greet.myApply(bob, {})); // 将输出 "undefined, I am Bobundefined"
```

## 3. 手写 bind 函数

下面是一个基础版本的 bind 函数实现：

```javascript
function myBind(context, ...args1) {
  // 调用 bind 的函数
  const fn = this;

  // 返回一个新函数
  return function (...args2) {
    // 判断是否作为构造函数使用
    if (new.target) {
      // 如果是 new 调用，则忽略传入的 context
      return new fn(...args1, ...args2);
    } else {
      // 普通函数调用，使用指定的 this 和参数
      return fn.apply(context, [...args1, ...args2]);
    }
  };
}
```

下面是一个基础版本的 bind 函数实现：

```javascript
Function.prototype.myBind = function (context, ...args1) {
  // 如果不是函数，抛出错误
  if (typeof this !== 'function') {
    throw new TypeError('myBind must be called on a function')
  }

  const fn = this

  const boundFn = function (...args2) {
    // 合并参数
    const finalArgs = [...args1, ...args2]

    // 处理 new 调用
    if (new.target) {
      // 使用 Object.create 避免修改原函数的 prototype
      const obj = Object.create(fn.prototype)
      const result = fn.apply(obj, finalArgs)
      // 如果函数返回了一个对象，则返回该对象，否则返回新创建的实例
      return result !== null && (typeof result === 'object' || typeof result === 'function') ? result : obj
    }

    // 处理 this 为 null 或 undefined 的情况
    const ctx = context || globalThis
    
    return fn.apply(ctx, finalArgs)
  }

  // 保持原型链
  boundFn.prototype = Object.create(fn.prototype)
  // 确保构造函数指向正确
  boundFn.prototype.constructor = boundFn

  return boundFn
}
```

测试用例

```javascript
// 测试用例
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`)
}
const person1 = new Person('Alice', 25)
const sayHello = person1.sayHello.myBind(person1)
sayHello() // Hello, I'm Alice
const person2 = new Person('Bob', 30)
const greet = person1.sayHello.myBind(person2)
greet() // Hello, I'm Bob
// 测试 new 调用
const BoundPerson = Person.myBind(null, 'Charlie')
const charlie = new BoundPerson(28)
console.log(charlie.name) // Charlie
console.log(charlie.age) // 28
charlie.sayHello() // Hello, I'm Charlie
```
