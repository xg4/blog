---
title: Javascript Utils
date: 2019-07-07 22:35:38
tags:
  - js
  - util
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [isStatic](#isStatic)
- [isPrimitive](#isPrimitive)
- [isObject](#isObject)
- [isObjectLike](#isObjectLike)
- [getRawType](#getRawType)
- [isPlainObject](#isPlainObject)
- [isArray](#isArray)
- [isRegExp](#isRegExp)
- [isDate](#isDate)
- [isNative](#isNative)
- [isFunction](#isFunction)
- [isLength](#isLength)
- [isArrayLike](#isArrayLike)
- [isEmpty](#isEmpty)

## isStatic

> 检测数据是不是除了 symbol 外的原始数据

```js
function isStatic(value) {
  const type = typeof value
  return (
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    types === 'undefined' ||
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

## getRawType

> 获取数据类型，返回结果为 Number、String、Object、Array 等

```js
function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
//getoRawType([]) ==> Array
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

## isArrayLike

> 检查 value 是否是类数组  
> 如果一个值被认为是类数组，那么它不是一个函数，并且 value.length 是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。这里字符串也将被当作类数组。

```js
function isArrayLike(value) {
  return value !== null && isLength(value.length) && !isFunction(value)
}
```

## hasOwnProperty

>

```js
function hasOwnProperty(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key)
}
```

## isEmpty

> 检查 value 是否为空  
> 如果是 null，直接返回 true；如果是类数组，判断数据长度；如果是 Object 对象，判断是否具有属性；如果是其他数据，直接返回 false(也可改为返回 true)

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
  return false
}
```
