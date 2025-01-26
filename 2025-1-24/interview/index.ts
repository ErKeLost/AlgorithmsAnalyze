
// 复习 手写 bind call apply

Function.prototype.call = function (context, ...args) {
  // 第一点 考虑各种情况 可能 context 不存在

  context = context || window

  // 创建一个独立的属性防止冲突
  const fn = Symbol('fn')

  // 将函数绑定到 context 上
  // person.greet = greet
  // person.greet()
  context[fn] = this

  // 执行函数
  const result = context[fn](...args)

  // 删除属性
  delete context[fn]
  return result
}


Function.prototype.apply = function (context, args) {
  context = context || window

  const fn = Symbol('fn')

  context[fn] = this

  const res = context[fn](...args)

  delete context[fn]

  return res
}

function greet(greeting, punctuation, time) {
  console.log(`${greeting}, I'm ${this.name}${punctuation} Time: ${time}`);
}

// 实现 bind

Function.prototype.bind = function (context, ...args) {
  const fn = this

  return function (...args2) {
    fn.apply(context, [...args, ...args2])
  }
}

// arguments 是一个类数组对象

function sum() {
  console.log(arguments)
}

// sum(1,2,3,4,5)

// 剩余参数 ...args

function sum2(...args) {
  console.log(args)
}

sum2(1, 2, 3, 4, 5)


// 只能有一个 剩余参数

// function sum3(a, ...args, b) {
//   console.log(a, args, b)
// }

// sum3(1,2,3,4,5)

// 柯里化
// 柯里化 将一个多参数函数转换为一系列单参数函数的过程 柯里化有一个需要注意的点 就是需要判断函数的参数 是否足够 如果足够
// 那么就不需要继续柯里化 如果不够 那么就需要继续柯里化

function add(a, b, c) {
  return a + b + c
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }

    return function (...args2) {
      return curried.apply(this, [...args, ...args2])
    }
  }
}


const curriedAdd = curry(add)

console.log(curriedAdd(1)(2)(3))


// 在回顾一下这个 tostring 问题

const res = Object.prototype.toString.call([])

console.log(res)

// 为什么要用 call 

// 因为 call 可以改变 this 的指向 
// const a = Object.prototype.toString([])
// 这种报错啊 tostring 没参数啊

