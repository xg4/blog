---
title: Webpack 4
date: 2019-06-26 12:04:45
tags:
  - js
  - webpack
---

> [webpack demos](https://github.com/xg4/webpack-demos)

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [main](#main)
- [loader](#loader)
  - [enforce](#enforce)
  - [awesome](#awesome)
- [server](#server)
  - [proxy](#proxy)
  - [hook](#hook)
  - [webpack-dev-middleware](#webpack-dev-middleware)
- [全局变量](#%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F)
  - [expose-loader](#expose-loader)
  - [Webpack.ProvidePlugin](#WebpackProvidePlugin)
  - [externals](#externals)
- [优化](#%E4%BC%98%E5%8C%96)
  - [module.noParse](#modulenoParse)
  - [Webpack.IgnorePlugin](#WebpackIgnorePlugin)
  - [Webpack.DllPlugin](#WebpackDllPlugin)
  - [happypack](#happypack)
  - [Tree-Shaking](#Tree-Shaking)
  - [SplitChunksPlugin](#SplitChunksPlugin)
  - [dynamic imports](#dynamic-imports)
  - [HMR - Hot Module Replacement](#HMR---Hot-Module-Replacement)

## main

核心概念

- Entry: 入口

- Output: 输出结果

- Module: 模块，webpack 中一切皆是模块

- Loader: 模块转换器，用于把模块原内容按照需求转换成新内容

- Plugin: 扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

## loader

> loader 因具有单一性，只处理一件事情

### enforce

执行顺序默认为从后向前，从右向左执行

- 前置(pre)

- 普通(normal)

- 行内(inline)

- 后置(post)

### awesome

| name         | test                   | description                   | link                                                     |
| ------------ | ---------------------- | ----------------------------- | -------------------------------------------------------- |
| html-loader  | `/\.html\$/`           | 处理 html 中的资源引用        | [GitHub](https://github.com/webpack-contrib/html-loader) |
| url-loader   | `/\.(png|jpe?g|gif)$/` | 处理资源文件，image、video 等 | [GitHub](https://github.com/webpack-contrib/url-loader)  |
| file-loader  | `/\.(png|jpe?g|gif)$/` | 处理资源文件，image、video 等 | [GitHub](https://github.com/webpack-contrib/file-loader) |
| babel-loader | `/\.(ts|js)x?$/`       | es+ 转 es5                    | [GitHub](https://github.com/babel/babel-loader)          |

## server

### proxy

简单的代理请求到目标域

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost',
        pathRewrite: { '/api': '' }
      }
    }
  }
}
```

### hook

webpack 中使用 express server

webpack dev server 是基于 express 构建的，它提供一个钩子函数 `before` 在参数中将 express app 暴露出来，用户可以自定义添加路由，模拟数据等

```js
module.exports = {
  devServer: {
    before(app) {
      app.get('/user', (req, res) => {
        res.json({ name: 'hello' })
      })
    }
  }
}
```

### webpack-dev-middleware

> [webpack/webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

用户自定义的 server 中使用 webpack

```js
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')
const compiler = webpack({
  // webpack options
  ...config
})
const express = require('express')
const app = express()

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
```

## 全局变量

### expose-loader

通过 `expose-loader` 将 import 的模块暴露到全局 `window` 上

loader 中配置

```js
module.exports = {
  module: {
    rules: [
      // import当前模块之后
      // 暴露模块到全局对象 window 上
      {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
      }
    ]
  }
}
```

內联形式

```js
import $ from 'expose-loader?$!jquery'
```

### Webpack.ProvidePlugin

通过 `new Webpack.ProvidePlugin()`, 给每个模块文件直接注入一个模块，其他模块文件无需引用，直接调用

```js
module.exports = {
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}
```

### externals

通过 `script` 在 html 引用，webpack 中设置 `externals` 直接使用外部引用，不打包进项目

```js
// webpack.config.js
module.exports = {
  externals: {
    jquery: 'jQuery'
  }
}

// index.js
import $ from 'jquery'

$('.my-element').animate(/* ... */)
```

## 优化

### module.noParse

> [module.noParse](https://webpack.js.org/configuration/module/#modulenoparse)

不解析正则匹配的文件内部的 `import`, `require`, `define` 等

noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 原因是一些库例如 jQuery lodash 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

```js
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/
  }
}
```

### Webpack.IgnorePlugin

> [Webpack.IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/) webpack 自带的插件

比如 moment 库中的语言包很大，使用 `IgnorePlugin` 在 moment 中任何以 './locale' 结尾的 `require` 都将被忽略

```js
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale$/,
  contextRegExp: /moment$/
})
```

用户需自行引入语言包

```js
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locals('zh-cn')
```

### Webpack.DllPlugin

> [Webpack.DllPlugin](https://webpack.js.org/plugins/dll-plugin/)

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。

用 DllPlugin 处理文件，需要两步

- 基于 dll 专属的配置文件，打包 dll 库

  ```js
  // webpack.dll.js
  const path = require('path')
  const Webpack = require('webpack')

  const resolve = (...dir) => path.resolve(__dirname, ...dir)

  module.exports = {
    mode: 'development',
    entry: {
      react: ['react', 'react-dom']
    },
    output: {
      filename: '_dll_[name].js', // 产生的文件名
      path: resolve('dist'),
      library: '_dll_[name]'
    },
    plugins: [
      // name要等于library里的name
      new Webpack.DllPlugin({
        name: '_dll_[name]',
        path: resolve('dist', 'manifest.json')
      })
    ]
  }
  ```

- 基于 webpack.config.js 文件，打包业务代码

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

const resolve = (...dir) => path.resolve(__dirname, ...dir)

module.exports = {
  mode: 'development',
  // 多入口
  entry: {
    home: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  module: {
    // 不去解析jquery的依赖关系
    noParse: /jquery/,
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        include: resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new Webpack.DllReferencePlugin({
      manifest: resolve('dist', 'manifest.json')
    }),
    new Webpack.IgnorePlugin(/\.\/local/, /moment/),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
```

### happypack

> 多线程打包 - [GitHub](https://github.com/amireh/happypack)

```js
// webpack.config.js
const HappyPack = require('happypack')

exports.module = {
  rules: [
    {
      test: /.js$/,
      // 1) replace your original list of loaders with "happypack/loader":
      // loaders: [ 'babel-loader?presets[]=es2015' ],
      use: 'happypack/loader',
      include: [
        /* ... */
      ],
      exclude: [
        /* ... */
      ]
    }
  ]
}

exports.plugins = [
  // 2) create the plugin:
  new HappyPack({
    // 3) re-add the loaders you replaced above in #1:
    loaders: ['babel-loader?presets[]=es2015']
  })
]
```

### Tree-Shaking

webpack 自带 Tree-Shaking, scope hosting

```js
// scope hosting 作用域提升，去除无用代码
const bar = 1
const foo = 2
const foobar = bar + foo
console.log(foobar)

// webpack build file
console.log(3)
```

基于 import/export 语法，Tree-Shaking 可以在编译的过程中获悉哪些模块并没有真正被使用，这些没用的代码，在最后打包的时候会被去除。适合于处理模块级别的代码，所以尽量使用 es6 的 import/export 语法。

### SplitChunksPlugin

> [webpack - SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

```js
// 默认设置
module.exports = {
  //...
  optimization: {
    // 分割代码块
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      // 缓存组
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 抽取的权重值
          priority: -10
        },
        default: {
          // 大小 大于 0kb
          minSize: 0,
          // 使用过两次以上
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```

### dynamic imports

> import() 还在草案中，需要 [@babel/plugin-syntax-dynamic-import](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import) 才能使用

通过 es6 的 import 实现按需加载，在使用 import() 分割代码后，你的浏览器并且要支持 Promise API 才能让代码正常运行， 因为 import() 返回一个 Promise，它依赖 Promise。对于不原生支持 Promise 的浏览器，你可以注入 Promise polyfill。

```js
// dynamic imports
import('./a')
import('./b')
```

### HMR - Hot Module Replacement

模块热替换（HMR - Hot Module Replacement）是 webpack 提供的最有用的功能之一。它允许在运行时替换，添加，删除各种模块，而无需进行完全刷新重新加载整个页面

启用 HRM

- new webpack.HotModuleReplacementPlugin()

- devServer 选项中的 hot 字段为 true

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

const resolve = (...dir) => path.resolve(__dirname, ...dir)

module.exports = {
  mode: 'production',
  // 多入口
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  devServer: {
    // 启用热更新
    hot: true,
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        include: resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      name: 'index.html'
    }),
    // 打印更新的模块路径
    new Webpack.NamedModulesPlugin(),
    // 热更新插件
    new Webpack.HotModuleReplacementPlugin()
  ]
}
```
