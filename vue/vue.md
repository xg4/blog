# vue

> [官方文档](https://cn.vuejs.org/)

## Table of Contents

1. [extend](#extend)

2. [slot](#slot)

3. [watch](#watch)

4. [plugins](#plugins)

5. [directive](#directive)

6. [sync modifier](#sync-modifier)

7. [keep alive](#keep-alive)

8. [syntax-dynamic-import](#syntax-dynamic-import)

9. [ref](#ref)

10. [vue-lazyload](#vue-lazyload)

## extend

> [https://cn.vuejs.org/v2/api/#Vue-extend](https://cn.vuejs.org/v2/api/#Vue-extend)

- Vue.extend(options)

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

## slot

> [https://cn.vuejs.org/v2/guide/components-slots.html](https://cn.vuejs.org/v2/guide/components-slots.html)

```html
<slot></slot>
```

## plugins

> [https://cn.vuejs.org/v2/guide/plugins.html](https://cn.vuejs.org/v2/guide/plugins.html)

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

## directive

> [https://cn.vuejs.org/v2/guide/custom-directive.html](https://cn.vuejs.org/v2/guide/custom-directive.html)

- `inserted` ：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

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

## sync modifier

> [https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)

- prop 进行“双向绑定”。

## keep alive

> [https://cn.vuejs.org/v2/api/#keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)

- 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

- 主要用于保留组件状态或避免重新渲染。

## watch

- [vm-$watch](https://cn.vuejs.org/v2/api/#vm-watch)

  - `deep: true` 监听对象内部值的变化

  ```js
  vm.$watch("someObject", callback, {
    deep: true
  })
  vm.someObject.nestedValue = 123
  // callback is fired
  ```

- [watch](https://cn.vuejs.org/v2/api/#watch)

  ```js
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

## syntax-dynamic-import

> 组件懒加载 [https://router.vuejs.org/zh-cn/advanced/lazy-loading.html](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html)

- 使用 Babel,添加 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件

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

**Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。**

## ref

> [https://cn.vuejs.org/v2/api/#ref](https://cn.vuejs.org/v2/api/#ref)

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

## vue-lazyload

> [https://github.com/hilongjw/vue-lazyload)](https://github.com/hilongjw/vue-lazyload))
