---
title: Document
date: 2019-04-10 14:53:49
tags: js
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [兼容浏览器 wheel 事件](#%E5%85%BC%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8-wheel-%E4%BA%8B%E4%BB%B6)

## 兼容浏览器 wheel 事件

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
