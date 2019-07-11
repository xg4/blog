---
title: Javascript Global API
date: 2019-06-26 14:45:09
tags:
  - js
  - browser
  - nodejs
  - api
---

> node global, browser window 上共同的 API

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [ASCII/Unicode](#ASCIIUnicode)
  - [String.prototype.charAt()](#StringprototypecharAt)
  - [String.prototype.charCodeAt()](#StringprototypecharCodeAt)
  - [String.fromCharCode()](#StringfromCharCode)
  - [String.prototype.codePointAt()](#StringprototypecodePointAt)
  - [String.fromCodePoint()](#StringfromCodePoint)
- [Intl](#Intl)
- [URL](#URL)
- [URLSearchParams](#URLSearchParams)

## ASCII/Unicode

### String.prototype.charAt()

> 从字符串中返回指定的字符

- `str.charAt(index)`

- index: 介于 0 和字符串长度减 1 之间的整数 (0 ~ length-1) 。**如果不是一个数值，则默认为 0**

- 索引超出范围，则返回空字符串`''`

### String.prototype.charCodeAt()

> 返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元

- `str.charCodeAt(index)`

- index: 介于 0 和字符串长度减 1 之间的整数 (0 ~ length-1) 。**如果不是一个数值，则默认为 0**

- 索引超出范围，则返回 `NaN`

### String.fromCharCode()

### String.prototype.codePointAt()

### String.fromCodePoint()

## Intl

> [MDN - Intl](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl)

## URL

> [MDN - URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)

## URLSearchParams

> [MDN - URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

node.js v10 已经全局内置 URLSearchParams

低于 v10 可以如下使用

```js
import { URLSearchParams } from 'url'
// or
const URLSearchParams = require('url').URLSearchParams
```

[GitHub polyfill](https://github.com/jerrybendy/url-search-params-polyfill)
