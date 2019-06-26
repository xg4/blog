---
title: Window
date: 2019-06-24 22:05:23
tags:
  - js
  - window
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [getComputedStyle](#getComputedStyle)
  - [example](#example)

## getComputedStyle

> [MDN - getComputedStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

- 返回的 CSSStyleDeclaration 对象将包含所有受支持的 CSS 属性长名称的活动值。示例名称是 border-bottom-width，border-width 和 border 是示例速记属性名称。仅使用像 font-size 这样的名字来查询值是最安全的。 查询诸如 font 等简写名称不适用于大多数浏览器

- CSS 属性值可以使用 `getPropertyValue(propName)` API 或直接索引到对象，如 `cs['z-index']` 或 `cs.zIndex`

### example

```js
const elem1 = document.getElementById('elemId')
const style = window.getComputedStyle(elem1, null)

// 它等价于
// const style = document.defaultView.getComputedStyle(elem1, null);
```

```html
<style>
  #elem-container {
    position: absolute;
    left: 100px;
    top: 200px;
    height: 100px;
  }
</style>

<div id="elem-container">dummy</div>
<div id="output"></div>

<script>
  function getTheStyle() {
    const elem = document.getElementById('elem-container')
    const theCSSprop = window
      .getComputedStyle(elem, null)
      .getPropertyValue('height')
    document.getElementById('output').innerHTML = theCSSprop
  }
  getTheStyle()
</script>
```
