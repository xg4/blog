---
title: React Router v4
date: '2018-09-12T12:00:37.000Z'
description: react router 基础使用
---

## react-router

> 提供了一些 router 的核心 api，包括 Router, Route, Switch 等，但是它没有提供 dom 操作进行跳转的 api

## react-router-dom

> 提供了 BrowserRouter, Route, Link 等 api，可以通过 dom 的事件控制路由。例如点击一个按钮进行跳转，大多数情况下我们是这种情况，所以在开发过程中，我们更多是使用 react-router-dom

## HashRouter/BrowserRouter

> 都提供路由的基本功能，可以随意选取其中一个

### HashRouter

> 通过 hash 值来对路由进行控制。如果你使用 HashRouter，你的路由就会默认有#

```jsx
<HashRouter>
  <Route exact path="/" component={Home} />
</HashRouter>
```

### BrowserRouter

- 大部分情况下我们不需要这个#，因为它看起来很怪，这时我们就需要用到 BrowserRouter

- 它的原理是使用 HTML5 history API (pushState, replaceState, popState)来使你的内容随着 url 动态改变的

```jsx
<BrowserRouter basename="/app">
  <Route exact path="/" component={Home} />
</BrowserRouter>
```

## Route

- Route 是路由的一个原材料，它是控制路径对应显示的组件。我们经常用的是 exact、path 以及 component 属性

- exact 控制匹配到/路径时不会再继续向下匹配，path 标识路由的路径，component 表示路径对应显示的组件。后面我们将结合 NavLink 完成一个很基本的路由使用。同时我们可以设置例如/user/:id 的方式来控制页面的显示，这需要配合 Link 或者 NavLink 配合使用。下面我们会提到

```jsx
<Route exact path="/" component={Home} />
```

## Link/NavLink

> 两者都是可以控制路由跳转的，不同点是 NavLink 的 api 更多，更加满足你的需求

### Link

- 主要 api 是 to，to 可以接受 string 或者一个 object，来控制 url

- example

  ```jsx
  <Link to="/home" />
  ```

  ```jsx
  <Link
    to={{
      pathname: '/home',
      search: '?sort=name',
      hash: '#the-hash',
      state: { x: true },
    }}
  />
  ```

### NavLink

- 它可以为当前选中的路由设置类名、样式以及回调函数等

- example

  ```jsx
  <NavLink exact activeClassName="active" to="/">
    home
  </NavLink>
  ```

- exact 用于严格匹配，匹配到/则不会继续向下匹配，to 则是控制跳转的路径，activeClassName 是选中状态的类名，我们可以为其添加样式。我们在/second 后面添加 1234 来想路由中传递信息，这结合了上面 Route 中的/second/:id

- match 是在使用 router 之后被放入 props 中的一个属性，在 class 创建的组件中我们需要通过 this.props.match 来获取 match 之中的信息。match 中包含的信息如下

## Switch

> 常常会用来包裹 Route，它里面不能放其他元素，用来只显示一个路由
