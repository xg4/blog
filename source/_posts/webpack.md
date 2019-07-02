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
