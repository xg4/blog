---
title: Javascript call,apply,bind
date: '2019-07-19T02:30:26.000Z'
description: Javascript call,apply,bind
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [bind this](#bind-this)
- [call](#call)
- [apply](#apply)
- [bind](#bind)

## bind this

1. 隐式绑定

调用对象下面的方法，自动绑定这个对象，如果没有，则为 `undefined`

```js
function hello() {
  console.log(this)
}

hello()
// 严格模式下是 undefined
// 非严格模式下是 window

const foo = {
  name: 'foo',
  hello: function () {
    console.log(this.name)
  },
}

foo.hello() // foo
```

1. 显式绑定（call，apply，bind）

```js
const foo = {
  name: 'foo',
  hello: function () {
    console.log(this.name)
  },
}

const bar = {
  name: 'bar',
}

foo.hello.call(bar) // bar
foo.hello.apply(bar) // bar
const newFn = foo.hello.bind(bar)
newFn() // bar
```

1. new 绑定

```js
function Test() {
  this.foo = 1
}
new Test() // this 指向 new 之后的实例
```

1. 箭头函数

箭头函数中的 `this` 是父作用域中的 `this`

## call

```js
Function.prototype._call = function (context = window, ...args) {
  // 生成唯一的 key ，避免其他属性被覆盖
  const key = Symbol()
  // 绑定 ctx 的 this
  context[key] = this
  // 获得结果
  const result = context[key](...args)
  // 删除 ctx 上的函数
  delete context[key]
  return result
}
```

## apply

与 `call` 相同，只是接收的参数形式不同

```js
Function.prototype._apply = function (context = window, args = []) {
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}
```

## bind

与 `apply`，`call` 相同，只是返回的是函数

```js
Function.prototype._bind = function (context = window, ...args) {
  const fn = this
  return function F() {
    if (this instanceof F) {
      return new fn(...args, ...arguments)
    } else {
      return fn._apply(context, [...args, ...arguments])
    }
  }
}
```
