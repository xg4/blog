---
title: Javascript - Browser
date: '2019-04-10T06:53:49.000Z'
description: Javascript - Browser
---

> 浏览器环境下的 javascript API、Utils

## Table of Contents

- [Table of Contents](#table-of-contents)
- [insertAdjacentElement](#insertadjacentelement)
- [getBoundingClientRect](#getboundingclientrect)
- [contains](#contains)
- [compareDocumentPosition](#comparedocumentposition)
- [MutationObserver](#mutationobserver)
- [getBattery](#getbattery)
- [download](#download)
- [fullScreen](#fullscreen)
- [requestAnimationFrame](#requestanimationframe)
- [performance](#performance)
- [Event](#event)
- [getComputedStyle](#getcomputedstyle)
- [Animations](#animations)
- [IntersectionObserver](#intersectionobserver)
- [scrollIntoView](#scrollintoview)
- [append](#append)
- [onWheel](#onwheel)

## insertAdjacentElement

> 可以通过不同的参数实现 `jQuery` 的 `append` | `prepend` | `after` | `before`

```html
<div id="parent"></div>
```

```js
const parent = document.getElementById('parent')
const node = document.createElement('span')
// 插入到指定元素内部的尾部
// 等价于 $(parent).append(node)
parent.insertAdjacentElement('beforeend', node)

// 插入到指定元素内部的头部
// 等价于 $(parent).prepend(node)
parent.insertAdjacentElement('afterbegin', node)

// 插入到指定元素后面
// 等价于 $(parent).after(node)
parent.insertAdjacentElement('afterend', node)

// 插入到指定元素前面
// 等价于 $(parent).after(node)
parent.insertAdjacentElement('beforebegin', node)
```

## getBoundingClientRect

> element.getBoundingClientRect() 获取元素相对浏览器左上角的偏移量以及元素尺寸信息, 返回值是一个 rect 对象, 其中包括:
> left: 元素左上角距离浏览器左上角的 X 轴偏移  
> top: 元素左上角距离浏览器左上角的 Y 轴偏移  
> width: 元素宽度
> height: 元素高度  
> right: 元素右下角距离浏览器左上角的 X 轴偏移）  
> bottom: 元素右下角距离浏览器左上角的 Y 轴偏移  
> x: 同 left  
> y: 同 top

可以判断元素是否已经进入可视区域

**`getBoundingClientRect` 会受到 `transform` 的影响, 比如你的元素设置了 `transform:scale(2)`, 那么 `getBoundingClientRect` 返回的 `width` 会是元素实际宽度的 2 倍, `top` 等位置信息也会因为元素尺寸变化而发生变化**

## contains

> node.contains(otherNode) 检查传入节点是否为该节点的子孙节点

```js
function isInPage(node) {
  return node === document.body ? false : document.body.contains(node)
}
```

## compareDocumentPosition

> node.compareDocumentPosition(otherNode) 可以比较当前节点与任意文档中的另一个节点的位置关系

## MutationObserver

> 监听 DOM 元素的变化触发回调，可监视的变化有：属性（attribute）/文本（character），同时支持监听子孙节点（childList/subtree）

```js
const observer = new MutationObserver(() => {
  console.log('change')
})

// 监听
observer.observe(el, { childList: true, subtree: true })

// 销毁
observer.disconnect()
```

## getBattery

> 电池状态 navigator.getBattery()

## download

利用 html5 a 标签的 download 属性进行下载

```js
const download = (rawData, name = 'file.json') => {
  const url = URL.createObjectURL(rawData)
  const a = document.createElement('a')
  a.download = name
  a.href = url
  a.style.display = 'none'
  // 兼容 firefox ，必须添加到 DOM 中才能触发下载
  document.body.append(a) // document.body.appendChild(a)
  a.click()
  a.remove() // document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
```

## fullScreen

- toFullScreen

  全屏

  ```js
  function toFullScreen(el = document.body) {
    el.webkitRequestFullScreen
      ? el.webkitRequestFullScreen()
      : el.mozRequestFullScreen
      ? el.mozRequestFullScreen()
      : el.msRequestFullscreen
      ? el.msRequestFullscreen()
      : el.requestFullScreen
      ? el.requestFullScreen()
      : alert('浏览器不支持全屏')
  }
  ```

- exitFullscreen

  退出全屏

  ```js
  function exitFullscreen(el = parent.document) {
    el.webkitCancelFullScreen
      ? el.webkitCancelFullScreen()
      : el.mozCancelFullScreen
      ? el.mozCancelFullScreen()
      : el.cancelFullScreen
      ? el.cancelFullScreen()
      : el.msExitFullscreen
      ? el.msExitFullscreen()
      : el.exitFullscreen
      ? el.exitFullscreen()
      : alert('切换失败,可尝试Esc退出')
  }
  ```

## requestAnimationFrame

新的动画 API，也可用于性能监控

[GitHub - raf](https://github.com/chrisdickinson/raf)

```js
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

window.cancelAnimationFrame =
  window.cancelAnimationFrame ||
  Window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  function (id) {
    window.clearTimeout(id)
  }
```

## performance

> 利用 performance.timing 进行性能分析

```js
window.onload = function () {
  setTimeout(function () {
    const t = performance.timing
    console.log(
      'DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0)
    )
    console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
    console.log(
      'request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0)
    )
    console.log(
      '解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0)
    )
    console.log(
      '白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0)
    )
    console.log(
      'domready时间 ：' +
        (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0)
    )
    console.log(
      'onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0)
    )

    if ((t = performance.memory)) {
      console.log(
        'js内存使用占比 ：' +
          ((t.usedJSHeapSize / t.totalJSHeapSize) * 100).toFixed(2) +
          '%'
      )
    }
  })
}
```

## Event

- 禁止某些键盘事件

  ```js
  document.addEventListener('keydown', function (event) {
    return (
      !(
        112 == event.keyCode || //F1
        123 == event.keyCode || //F12
        (event.ctrlKey && 82 == event.keyCode) || //ctrl + R
        (event.ctrlKey && 78 == event.keyCode) || //ctrl + N
        (event.shiftKey && 121 == event.keyCode) || //shift + F10
        (event.altKey && 115 == event.keyCode) || //alt + F4
        ('A' == event.srcElement.tagName && event.shiftKey)
      ) || (event.returnValue = false) //shift + 点击a标签
    )
  })
  ```

- 禁止右键、选择、复制

  ```js
  ;['contextmenu', 'selectstart', 'copy'].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      return (event.returnValue = false)
    })
  })
  ```

- [transitionend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)

- [animationend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationend_event)

## getComputedStyle

> [MDN - getComputedStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

- window.getComputedStyle 返回的 CSSStyleDeclaration 对象将包含所有受支持的 CSS 属性长名称的活动值。示例名称是 border-bottom-width，border-width 和 border 是示例速记属性名称。仅使用像 font-size 这样的名字来查询值是最安全的。 查询诸如 font 等简写名称不适用于大多数浏览器

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

## Animations

> [MDN - Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

[GitHub polyfill](https://github.com/web-animations/web-animations-js)

## IntersectionObserver

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)  
> [阮一峰](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

[Github polyfill](https://github.com/w3c/IntersectionObserver)

## scrollIntoView

> [MDN - Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

## append

> [MDN - ParentNode.append()](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/append)

- 添加多个 node 节点或者 text 节点

- Polyfill

  ```js
  ;(function (arr) {
    arr.forEach(function (item) {
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

          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node
            docFrag.appendChild(
              isNode ? argItem : document.createTextNode(String(argItem))
            )
          })

          this.appendChild(docFrag)
        },
      })
    })
  })([Element.prototype, Document.prototype, DocumentFragment.prototype])
  ```

## onWheel

> 兼容浏览器 wheel 事件

```js
const onWheel = (function () {
  const wheelEvt =
    'onwheel' in document.createElement('div')
      ? 'wheel'
      : document.onmousewheel !== undefined
      ? 'mousewheel'
      : 'DOMMouseScroll'
  return function (el, func) {
    el.addEventListener(wheelEvt, func)
  }
})()
```
