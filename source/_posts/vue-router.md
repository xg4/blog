---
title: Vue Router
date: 2018-09-10 12:20:55
tags:
  - js
  - vue
---

## Table of Contents

> [官方文档](https://router.vuejs.org/zh-cn/)

- [Table of Contents](#table-of-contents)
- [路由懒加载](#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)
- [meta](#meta)
- [navigation guards](#navigation-guards)
- [navigation](#navigation)

## 路由懒加载

> [组件懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

- 使用 Babel，添加 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件

  ```bash
  $ yarn add @babel/plugin-syntax-dynamic-import --dev
  ```

  `.babelrc`

  ```json
  {
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
  }
  ```

- 定义一个被 Webpack 自动代码分割的异步组件。

  ```js
  const Foo = () => import('./Foo.vue')

  const router = new VueRouter({
    routes: [{ path: '/foo', component: Foo }]
  })
  ```

- 把组件按组分块

  有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中，只需要使用命名 chunk，一个特殊的注释语法来提供 chunk name (需要 webpack > 2.4)

  ```js
  const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
  const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
  const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
  ```

  **webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中**

## meta

> [路由元信息](https://router.vuejs.org/zh-cn/advanced/meta.html)

- 定义路由的时候可以配置 meta 字段：

  ```js
  const router = new VueRouter({
    routes: [
      {
        path: '/foo',
        component: Foo,
        children: [
          {
            path: 'bar',
            component: Bar,
            // a meta field
            meta: { requiresAuth: true }
          }
        ]
      }
    ]
  })
  ```

## navigation guards

> [导航守卫](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
// ...
})
```

- to: `Route` 即将要进入的目标 路由对象

- from: `Route` 当前导航正要离开的路由

- next: `Function` 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数

  - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）

  - next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址

  - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项

  - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调

## navigation

> [编程式导航](https://router.vuejs.org/zh-cn/essentials/navigation.html)

- 声明式

  ```html
  <router-link :to="..."></router-link>
  ```

- 编程式

  ```js
  router.push(location, onComplete?, onAbort?)
  ```
