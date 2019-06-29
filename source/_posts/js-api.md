---
title: Javascript Global API
date: 2019-06-26 14:45:09
tags:
  - js
  - browser
  - nodejs
  - api
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [Intl](#Intl)
- [URL](#URL)
- [URLSearchParams](#URLSearchParams)

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
