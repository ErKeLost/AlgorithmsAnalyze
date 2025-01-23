## 数据类型和类型判断

### 1. 数据类型

js 现在又 8 种数据类型

```ts
let str = "Hello";           // String
let num = 123;               // Number
let bool = true;             // Boolean
let u = undefined;           // Undefined
let n = null;                // Null
let sym = Symbol('sym');     // Symbol (ES6新增)
let big = 9007199254740991n; // BigInt (ES2020新增)
```

引用数据类型 

```ts
let obj = {};               // Object
let arr = [];               // Array (属于Object)
let func = function(){};    // Function (属于Object)
let date = new Date();      // Date (属于Object)
```


### 2. 类型判断

类型判断多种方式

typeof 
```ts

typeof "123" // string

typeof 123 // number

typeof true // boolean

typeof undefined // undefined

typeof null // object  // 这是js的bug

typeof Symbol() // symbol

typeof 9007199254740991n // bigint

typeof {} // object

typeof [] // object

typeof function(){} // function
```

```ts
[] instanceof Array        // true
{} instanceof Object      // true
function(){} instanceof Function // true
```

```ts
Object.prototype.toString.call([])        // "[object Array]"
Object.prototype.toString.call({})        // "[object Object]"
Object.prototype.toString.call(null)      // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
```

`object.prototype.toString.call()` 可以判断所有类型原理

每个对象都会继承 object 原型上的方法 其中 toString 方法返回对象的字符串表示

Object 原型上的 toString() 方法 返回 `[object Type]` 其中 Type 是对象的类型

为什么要用 call 因为 数组和其他类型重写了 toString 方法 我们需要用 call 来调用 Object 原型上的 toString 方法

##### call apply bind 原理

```ts
Function.prototype.call = function(context, ...args) {
  const fn = Symbol('fn')
  context[fn] = this

  const res = context[fn](...args)

  delete context[fn]

  return res
}
```

apply 和 bind 原理类似 只是 apply 是直接调用 而 bind 是返回一个新函数

为什么要用 symbol 因为 symbol 是唯一的 不会和其他属性名冲突


bind 原理

```ts
Function.prototype.bind = function(context) {
  const self = this

  return function(...args) {
    self.call(context, ...args)
  }
}
```

函数柯里化

```ts
function curry()

一般情况下 如果我们实现一个打折的函数 需要这么写

function discount(price, discount) {
  return price * discount
}

discount(100, 0.8) // 80
discount(100, 0.9) // 90
discount(100, 0.7) // 70

如果我们每次都要传入相同的 折扣 岂不是很麻烦

function curried(discount) {
  return function (price) {
    return price * discount
  }
}

每次创建固定的折扣率

const discount80 = curried(0.8)

discount80(100) // 80
discount80(100) // 80
discount80(100) // 80
```

```ts
// 1. 普通版本
function handleInput(fieldName, event) {
    console.log(`${fieldName} 的值是: ${event.target.value}`);
}

// 使用时需要写匿名函数
<input onChange={(e) => handleInput('username', e)} />
<input onChange={(e) => handleInput('password', e)} />

// 2. 柯里化版本
function curriedHandleInput(fieldName) {
    return function(event) {
        console.log(`${fieldName} 的值是: ${event.target.value}`);
    }
}

// 使用时更简洁
<input onChange={curriedHandleInput('username')} />
<input onChange={curriedHandleInput('password')} />
```

3. 作用域和闭包

