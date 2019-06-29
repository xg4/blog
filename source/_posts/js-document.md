---
title: Document
date: 2019-04-10 14:53:49
tags:
  - js
  - window
  - document
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [Web Animations](#Web-Animations)
- [Event](#Event)
- [IntersectionObserver](#IntersectionObserver)
- [Element.scrollIntoView()](#ElementscrollIntoView)
- [ParentNode.append()](#ParentNodeappend)
- [onWheel](#onWheel)

## Web Animations

> [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

[GitHub polyfill](https://github.com/web-animations/web-animations-js)

## Event

- [transitionend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)

- [animationend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationend_event)

## IntersectionObserver

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)  
> [阮一峰](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

[Github polyfill](https://github.com/w3c/IntersectionObserver)

## Element.scrollIntoView()

> [MDN - Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

## ParentNode.append()

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
