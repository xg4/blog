---
title: Javascript - Browser
date: 2019-04-10 14:53:49
tags:
  - js
  - browser
  - window
  - document
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [Window](#Window)
  - [getComputedStyle](#getComputedStyle)
- [Document](#Document)
  - [Web Animations](#Web-Animations)
  - [Event](#Event)
  - [IntersectionObserver](#IntersectionObserver)
  - [Element.scrollIntoView()](#ElementscrollIntoView)
  - [ParentNode.append()](#ParentNodeappend)
  - [onWheel](#onWheel)

## Window

### getComputedStyle

> [MDN - getComputedStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

- 返回的 CSSStyleDeclaration 对象将包含所有受支持的 CSS 属性长名称的活动值。示例名称是 border-bottom-width，border-width 和 border 是示例速记属性名称。仅使用像 font-size 这样的名字来查询值是最安全的。 查询诸如 font 等简写名称不适用于大多数浏览器

- CSS 属性值可以使用 `getPropertyValue(propName)` API 或直接索引到对象，如 `cs['z-index']` 或 `cs.zIndex`

- example

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

## Document

### Web Animations

> [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

[GitHub polyfill](https://github.com/web-animations/web-animations-js)

### Event

- [transitionend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)

- [animationend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationend_event)

### IntersectionObserver

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)  
> [阮一峰](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

[Github polyfill](https://github.com/w3c/IntersectionObserver)

### Element.scrollIntoView()

> [MDN - Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

### ParentNode.append()

> [MDN - ParentNode.append()](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/append)

- 添加多个 node 节点或者 text 节点

- Polyfill

  ```js
  ;(function(arr) {
    arr.forEach(function(item) {
      if (item.hasOwnProperty('append')) {
        return
      }
      Object.defineProperty(item, 'append', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function append() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment()

          argArr.forEach(function(argItem) {
            var isNode = argItem instanceof Node
            docFrag.appendChild(
              isNode ? argItem : document.createTextNode(String(argItem))
            )
          })

          this.appendChild(docFrag)
        }
      })
    })
  })([Element.prototype, Document.prototype, DocumentFragment.prototype])
  ```

### onWheel

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
