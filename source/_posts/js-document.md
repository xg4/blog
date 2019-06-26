---
title: Document
date: 2019-04-10 14:53:49
tags:
  - js
  - window
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [append](#append)
- [onWheel](#onWheel)

## append

## onWheel

> 兼容浏览器 wheel 事件

```js
const onWheel = (function() {
  const wheelEvt =
    'onwheel' in document.createElement('div')
      ? 'wheel'
      : document.onmousewheel !== undefined
      ? 'mousewheel'
      : 'DOMMouseScroll'
  return function(el, func) {
    el.addEventListener(wheelEvt, func)
  }
})()
```
