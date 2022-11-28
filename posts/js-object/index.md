---
title: Javascript - Object
date: '2019-04-08T07:00:46.000Z'
description: Javascript - Object
---

> [MDN - Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Object.preventExtension](#objectpreventextension)
  - [Object.isExtensible](#objectisextensible)
- [Object.seal](#objectseal)
  - [Object.isSealed](#objectissealed)
- [Object.freeze](#objectfreeze)
  - [Object.isFrozen](#objectisfrozen)
- [Object.defineProperty](#objectdefineproperty)
  - [descriptor](#descriptor)
  - [keys](#keys)
- [for...in](#forin)
- [hasOwnProperty](#hasownproperty)

## Object.preventExtension

> 该方法将对象标记为不可扩展，阻止添加自身的属性，但不可扩展对象的属性仍然可被删除、修改，也可以添加到对象原型，尝试将新属性添加到不可扩展对象将静默失败或抛出 `TypeError`，**一旦使其不可扩展，就无法再对象进行扩展。**

```js
/**
 * @description 方法让一个对象变的不可扩展，
 * 也就是永远不能再添加新的属性
 * @param {Object} 将要变得不可扩展的对象
 * @return {Object} 已经不可扩展的对象
 */
Object.preventExtensions(obj)
```

### Object.isExtensible

> 默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 `__proto__` 属性可以被更改。`Object.preventExtensions`、`Object.seal` 或 `Object.freeze` 方法都可以标记一个对象为不可扩展（non-extensible）

```js
/**
 * @description  方法判断一个对象是否是可扩展的
 * （是否可以在它上面添加新的属性）
 * @param {Object} 需要检测的对象
 * @return {Boolean} 表示给定对象是否可扩展
 */
Object.isExtensible(obj)
```

**注：虽然 `Object.freeze` 或 `Object.seal` 之后的对象是不可扩展的，但使用 `Object.isExtensible` 判断返回 `false`**

## Object.seal

> 密封一个对象，使对象不可扩展，且所有自身属性都不可配置、不可删除（但不一定是不可写）的对象

```js
/**
 * @description 封闭一个对象
 * 阻止添加新属性并将所有现有属性标记为不可配置
 * 当前属性的值只要可写就可以改变
 * @param {Object} 将要被密封的对象
 * @return {Object} 被密封的对象
 */
Object.seal(obj)
```

1. 给对象设置，`Object.preventExtension(obj)`，
   禁止更改原型，禁止添加属性

2. 为对象的每一个属性设置，`configurable:false`，
   禁止更改属性值

**与 `Object.freeze` 不同的是，`Object.seal` 后的对象是可写的 `writable:true`，可以改变其现有属性**

### Object.isSealed

```js
/**
 * @description 方法判断一个对象是否被密封
 * @param {Object} 被检测的对象
 * @return {Boolean} 表示给定对象是否被密封
 */
Object.isSealed(obj)
```

## Object.freeze

> 冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

```js
/**
 * @description 被冻结对象自身的所有属性都不可能以任何方式被修改。
 * 任何修改尝试都会失败，无论是静默地还是通过抛出TypeError异常
 * @param {Object} 要被冻结的对象
 * @return {Object} 被冻结的对象
 */
Object.freeze(obj)
```

1. 给对象设置，`Object.preventExtension(obj)` 禁止更改原型，禁止添加属性

2. 为对象的每一个属性设置，`writable:false` 禁止更改属性值

3. 为对象的每一个属性设置，`configurable:false` 禁止删除属性

**注：禁止添加属性，是 `Object.preventExtensions` 控制的，而禁止删除属性，是 `configuable:false` 控制的。用 `Object.seal()` 密封的对象可以改变它们现有的属性，使用 `Object.freeze()` 冻结的对象中现有属性是不可变的。**

### Object.isFrozen

> 一个对象是冻结的是指它不可扩展，所有属性都是不可配置的，且所有数据属性（即没有 `getter` 或 `setter` 组件的访问器的属性）都是不可写的。

```js
/**
 * @description 方法判断一个对象是否被冻结
 * @param {Object} 被检测的对象
 * @return {Boolean} 表示给定对象是否被冻结
 */
Object.isFrozen(obj)
```

## Object.defineProperty

```js
/**
 * @description 方法会直接在一个对象上定义一个新属性
 * 或者修改一个对象的现有属性，并返回这个对象
 * @param {Object} obj 要在其上定义属性的对象
 * @param {} prop 要定义或修改的属性的名称
 * @param {} descriptor 将被定义或修改的属性描述符
 * @return {Object} 被传递给函数的对象
 */
Object.defineProperty(obj, prop, descriptor)
```

### descriptor

> 对象里目前存在的属性描述符有两种主要形式：**数据描述符** 和 **存取描述符**。**数据描述符** 是一个具有值的属性，该值可能是可写的，也可能不是可写的。**存取描述符** 是由 getter-setter 函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。

**数据描述符和存取描述符均具有以下可选键值：**

- configurable

  当且仅当该属性的 configurable 为 `true` 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 `false`

- enumerable

  当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 `false`

**数据描述符同时具有以下可选键值：**

- value

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 `undefined`

- writable

  当且仅当该属性的 writable 为 true 时，value 才能被赋值运算符改变。默认为 `false`

**存取描述符同时具有以下可选键值：**

- get

  一个给属性提供 getter 的方法，如果没有 getter 则为 `undefined`。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入 `this` 对象（由于继承关系，这里的 `this` 并不一定是定义该属性的对象）

  默认为 `undefined`

- set

  一个给属性提供 setter 的方法，如果没有 setter 则为 `undefined`。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值

  默认为 `undefined`

### keys

|            | configurable | enumerable | value | writable | get | set |
| ---------- | ------------ | ---------- | ----- | -------- | --- | --- |
| 数据描述符 | Yes          | Yes        | Yes   | Yes      | No  | No  |
| 存取描述符 | Yes          | Yes        | No    | No       | Yes | Yes |

> 如果一个描述符不具有 `value`，`writable`，`get` 和 `set` 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(`value` 或 `writable`)和(`get` 或 `set`)关键字，将会产生一个异常。

## for...in

> `for...in` 语句以任意顺序遍历一个对象的可枚举属性

`for...in` 也会遍历原型链上的可枚举属性，可以通过 `Object.hasOwnProperty` 方法判断是否自身属性

## hasOwnProperty

> 所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性

```js
const o = {}
'toString' in o // true
o.hasOwnProperty('toString') // false
```

防止方法被重写，使用 `Object.prototype` 上的方法定义一个工具函数

```js
function hasOwn(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}
```

**注：和 `in` 运算符不同，该方法会忽略掉那些从原型链上继承到的属性**
