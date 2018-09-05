# vue-notebook

- [vue](#vue)
  - [插件](#plugin)
  - [自定义指令](#directive)
  - [.sync](#sync)
  - [keep-alive](#keep-alive)
  - [watch](#watch)
  - [Vue.extend](#extend)
  - [组件插槽](#slot)
  - [懒加载](#lazyLoading)
  - [图片懒加载](#lazyImg)
  - [ref](#ref)
- [vue-router](#vueRouter)
  - [路由元信息](#meta)
  - [路由守卫](#guards)
  - [编程式的导航](#navigation)

<p id="vue"><p>

# vue

> [官方文档](https://cn.vuejs.org/)

<p id="plugin"></p>

## # [插件](https://cn.vuejs.org/v2/guide/plugins.html)

- Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

<p id="directive"></p>

## # [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})
```

- `inserted` ：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

<p id="sync"></p>

## # [.sync 修饰符](https://cn.vuejs.org/v2/guide/components.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- prop 进行“双向绑定”。

<p id="keep-alive"></p>

## # [keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)

- 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

- 主要用于保留组件状态或避免重新渲染。

<p id="watch"><p>

## # watch

- [vm-$watch](https://cn.vuejs.org/v2/api/#vm-watch)
  - `deep: true` 监听对象内部值的变化

```
vm.$watch('someObject', callback, {
  deep: true
})
vm.someObject.nestedValue = 123
// callback is fired
```

- [watch](https://cn.vuejs.org/v2/api/#watch)

```javascript
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function(val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal)
    },
    // 方法名
    b: "someMethod",
    // 深度 watcher
    c: {
      handler: function(val, oldVal) {
        /* ... */
      },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: function(val, oldVal) {
        /* ... */
      },
      immediate: true
    },
    e: [
      function handle1(val, oldVal) {
        /* ... */
      },
      function handle2(val, oldVal) {
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    "e.f": function(val, oldVal) {
      /* ... */
    }
  }
})
vm.a = 2 // => new: 2, old: 1
```

<p id="extend"></p>

## # [Vue.extend(options)](https://cn.vuejs.org/v2/api/#Vue-nextTick)

```js
// 注册组件，传入一个扩展过的构造器
Vue.component(
  "my-component",
  Vue.extend({
    /* ... */
  })
)

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component("my-component", {
  /* ... */
})

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component("my-component")
```

```js
var MyComponent = Vue.extend({
  template: "<div>Hello!</div>"
})

// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount("#app")

// 同上
new MyComponent({ el: "#app" })

// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById("app").appendChild(component.$el)
```

<p id="slot"></p>

## # [组件插槽](https://cn.vuejs.org/v2/guide/components.html#%E5%8D%95%E4%B8%AA%E6%8F%92%E6%A7%BD)

```html
<slot></slot>
```

<p id="lazyLoading"></p>

## # [懒加载](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html)

- 使用 Babel,添加 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件

- 定义一个被 Webpack 自动代码分割的异步组件。

```js
const Foo = () => import("./Foo.vue")

const router = new VueRouter({
  routes: [{ path: "/foo", component: Foo }]
})
```

- 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue")
const Bar = () => import(/* webpackChunkName: "group-foo" */ "./Bar.vue")
const Baz = () => import(/* webpackChunkName: "group-foo" */ "./Baz.vue")
```

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。

<p id="lazyImg"></p>

## # 图片懒加载

> [vue-lazyload](https://github.com/hilongjw/vue-lazyload)

## # [ref](https://cn.vuejs.org/v2/api/#ref)

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

<p id="vueRouter"></p>

# vue-router

> [官方文档](https://router.vuejs.org/zh-cn/)

<p id="meta"></p>

## # [路由元信息](https://router.vuejs.org/zh-cn/advanced/meta.html)

- 定义路由的时候可以配置 meta 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      children: [
        {
          path: "bar",
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

<p id="guards"></p>

## # [导航守卫](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
// ...
})
```

- to: Route: 即将要进入的目标 路由对象
- from: Route: 当前导航正要离开的路由
- next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
  - next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
  - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
  - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

<p id="navigation"></p>

## # [编程式的导航](https://router.vuejs.org/zh-cn/essentials/navigation.html)

- ```js
  router.push(location, onComplete?, onAbort?)
  ```

  - 声明式

    ```html
    <router-link :to="...">
    ```

  - 编程式

    ```js
    router.push(...)
    ```
