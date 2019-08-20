---
title: Javascript Utils
date: 2019-07-07 19:35:38
tags:
  - js
  - util
---

> javascript 语法基础 ECMAScript 的 Utils

## Table of Contents

- [Table of Contents](#table-of-contents)
- [shuffle](#shuffle)
- [randomInt](#randomint)
- [async/await-try/catch](#asyncawait-trycatch)
- [sleep](#sleep)
- [isStatic](#isstatic)
- [isPrimitive](#isprimitive)
- [isObject](#isobject)
- [isObjectLike](#isobjectlike)
- [toString](#tostring)
- [isPlainObject](#isplainobject)
- [isArray](#isarray)
- [isRegExp](#isregexp)
- [isDate](#isdate)
- [isNative](#isnative)
- [isFunction](#isfunction)
- [isLength](#islength)
- [isValidArrayIndex](#isvalidarrayindex)
- [isArrayLike](#isarraylike)
- [hasOwn](#hasown)
- [isEmpty](#isempty)
- [inBrowser](#inbrowser)
- [hasProto](#hasproto)
- [userAgent](#useragent)
- [browserType](#browsertype)
- [toString](#tostring-1)
- [cached](#cached)
- [isReserved](#isreserved)
- [charCodeAt](#charcodeat)
- [camelize](#camelize)
- [hyphenate](#hyphenate)
- [capitalize](#capitalize)
- [extend](#extend)
- [deepClone](#deepclone)
- [Array - unique](#array---unique)
- [isNaN](#isnan)
- [Array - max](#array---max)
- [Array - min](#array---min)

## shuffle

> Fisher–Yates 乱序算法

```js
function shuffle(arr) {
  let length = arr.length
  while (length > 1) {
    let index = Math.floor(Math.random() * length--)
    ;[arr[length], arr[index]] = [arr[index], arr[length]]
  }
  return arr
}
```

## randomInt

```js
export function randomInt(min, max) {
  if (min > max) {
    ;[min, max] = [max, min]
  }
  return Math.floor(min + Math.random() * (max - min + 1))
}
```

## async/await-try/catch

简化 promise 函数的异常捕获，类 node API

```js
export default function errorCaptured(promiseFunc) {
  return promiseFunc.then((...args) => [null, ...args]).catch(err => [err])
}
```

## sleep

```js
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
```

## isStatic

> 检测数据是不是除了 symbol 外的原始数据

```js
function isStatic(value) {
  const type = typeof value
  return (
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    type === 'undefined' ||
    value === null
  )
}
```

## isPrimitive

> 检测数据是不是原始数据

```js
function isPrimitive(value) {
  return isStatic(value) || typeof value === 'symbol'
}
```

## isObject

> 判断数据是不是引用类型的数据 (例如： Array, Function, Object, Regexp, new Number(0),以及 new String(''))

```js
function isObject(value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}
```

## isObjectLike

> 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"

```js
function isObjectLike(value) {
  return value !== null && typeof value === 'object'
}
```

## toString

> 获取数据类型，返回结果为 Number、String、Object、Array 等

```js
function _toString(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
// _toString([]) ==> Array
```

## isPlainObject

> 判断数据是不是 Object 类型的数据

```js
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
```

## isArray

> 判断数据是不是数组类型的数据

```js
function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}
```

ES6

```js
Array.isArray
```

## isRegExp

> 判断数据是不是正则对象

```js
function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}
```

## isDate

> 判断数据是不是时间对象

```js
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]'
}
```

## isNative

> 判断 value 是不是浏览器内置函数  
> 内置函数 toString 后的主体代码块为 [native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝(toString 后掐头去尾再由 Function 转)

```js
function isNative(value) {
  return typeof value === 'function' && /native code/.test(value.toString())
}
```

## isFunction

> 检查 value 是不是函数

```js
function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]'
}
```

## isLength

> 检查 value 是否为有效的类数组长度

```js
function isLength(value) {
  return (
    typeof value === 'number' &&
    value > -1 &&
    value % 1 === 0 &&
    value <== Number.MAX_SAFE_INTEGER
  )
}
```

## isValidArrayIndex

> 判断变量是否含有效的数组索引

```js
function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val))
  // n >= 0 && Math.floor(n) === n 保证了索引是一个大于等于 0 的整数
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
```

## isArrayLike

> 检查 value 是否是类数组  
> 如果一个值被认为是类数组，那么它不是一个函数，并且 value.length 是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。这里字符串也将被当作类数组。

```js
function isArrayLike(value) {
  return value !== null && isLength(value.length) && !isFunction(value)
}
```

## hasOwn

> 检查是否自身属性，而不是原型链上的

```js
function hasOwnProperty(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key)
}
```

## isEmpty

> 检查 value 是否为空  
> 如果是 null，直接返回 true；如果是类数组，判断数据长度；如果是 Object 对象，判断是否具有属性；如果是其他数据，直接返回 true

```js
function isEmpty(value) {
  if (value === null) {
    return true
  }
  if (isArrayLike(value)) {
    return !value.length
  } else if (isPlainObject(value)) {
    for (let key in value) {
      if (hasOwnProperty(value, key)) {
        return false
      }
    }
  }
  return true
}
```

## inBrowser

> 检测当前宿主环境是否是浏览器

```js
// 通过判断 `window` 对象是否存在即可
const inBrowser = typeof window !== 'undefined'
```

## hasProto

> 检查当前环境是否可以使用对象的 `__proto__` 属性

```js
// 一个对象的 __proto__ 属性指向了其构造函数的原型
// 从一个空的对象字面量开始沿着原型链逐级检查。
const hasProto = '__proto__' in {}
```

## userAgent

> 获取当浏览器的 user agent

```js
// toLowerCase目的是 为了后续的各种环境检测
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
```

## browserType

> 使用正则去匹配 UA 中是否包含'msie'或者'trident'这两个字符串即可判断是否为 IE 浏览器

```js
const isIE = UA && /msie|trident/.test(UA)
const isIE9 = UA && UA.indexOf('msie 9.0') > 0
const isEdge = UA && UA.indexOf('edge/') > 0
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
```

## toString

> 将给定变量的值转换为 string 类型并返回

```js
export function toString(val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
    ? JSON.stringify(val, null, 2)
    : String(val)
}
```

## cached

> 记忆函数：缓存函数的运算结果

```js
function cached(fn) {
  const cache = Object.create(null)
  return function(str) {
    return cache[str] || (cache[str] = fn(str))
  }
}
```

## isReserved

> 检测字符串是否以 `$` 或者 `_` 开头

```js
// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
export function isReserved(str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5f
}
```

## charCodeAt

> 从传递进来的字母序列中找到缺失的字母并返回它。 如：fearNotLetter("abce") 应该返回 "d"。

```js
function fearNotLetter(str) {
  //将字符串转为ASCII码，并存入数组
  let arr = []
  for (let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i))
  }
  for (let j = 1; j < arr.length; j++) {
    let num = arr[j] - arr[j - 1]
    //判断后一项减前一项是否为1，若不为1，则缺失该字符的前一项
    if (num != 1) {
      //将缺失字符ASCII转为字符并返回
      return String.fromCharCode(arr[j] - 1)
    }
  }
  return undefined
}
fearNotLetter('abce') // "d"
```

## camelize

> 连字符转驼峰命名

```js
const camelizeRE = /-(\w)/g
function camelize(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : ''
  })
}
//ab-cd-ef ==> abCdEf
//使用记忆函数
const _camelize = cached(camelize)
```

## hyphenate

> 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写

```js
const hyphenateRE = /\B([A-Z])/g
function hyphenate(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}
//abCd ==> ab-cd
//使用记忆函数
const _hyphenate = cached(hyphenate)
```

## capitalize

> 字符串首位大写

```js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// abc ==> Abc
//使用记忆函数
const _capitalize = cached(capitalize)
```

## extend

> 将属性混合到目标对象中

```js
function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
```

## deepClone

- 简单的深克隆

```js
function deepClone(target) {
  return JSON.parse(JSON.stringify(target))
}
```

- 完整的 deepClone 可参考 lodash

  - [lodash - cloneDeep](https://github.com/lodash/lodash/blob/master/cloneDeep.js)

## Array - unique

- 基于 `Set` 简单实现

```js
function unique(arr) {
  return [...new Set(arr)]
}
```

## isNaN

> 检查数据是否是非数字值  
> 原生的 isNaN 会把参数转换成数字(valueof)，而 null、true、false 以及长度小于等于 1 的数组(元素为非 NaN 数据)会被转换成数字，这不是我想要的。Symbol 类型的数据不具有 valueof 接口，所以 isNaN 会抛出错误，这里放在后面，可避免错误

```js
function _isNaN(value) {
  const type = typeof value
  return !(type === 'string' || type === 'number') || isNaN(v)
}
```

## Array - max

> 求取数组中非 NaN 数据中的最大值

```js
function max(arr) {
  arr = arr.filter(item => !_isNaN(item))
  return arr.length ? Math.max.apply(null, arr) : undefined
}
//max([1, 2, '11', null, 'fdf', []]) ==> 11
```

## Array - min

> 求取数组中非 NaN 数据中的最小值

```js
function min(arr) {
  arr = arr.filter(item => !_isNaN(item))
  return arr.length ? Math.min.apply(null, arr) : undefined
}
//min([1, 2, '11', null, 'fdf', []]) ==> 1
```
