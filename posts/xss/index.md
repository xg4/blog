---
title: XSS - 跨站脚本攻击
date: '2019-06-30T03:50:09.000Z'
description: XSS - 跨站脚本攻击
---

## 目录

- [目录](#%E7%9B%AE%E5%BD%95)
- [分类](#%E5%88%86%E7%B1%BB)
  - [反射型](#%E5%8F%8D%E5%B0%84%E5%9E%8B)
  - [存储型](#%E5%AD%98%E5%82%A8%E5%9E%8B)
- [防御](#%E9%98%B2%E5%BE%A1)

> XSS 攻击全称跨站脚本攻击，为了不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为 XSS, XSS 是一种在 web 应用中的计算机安全漏洞，它允许恶意 web 用户将代码植入到提供给其它用户使用的页面中。（任何用户输入都是不可信的）

## 分类

### 反射型

- 只是简单地把用户输入的数据 “反射” 给浏览器， 反射型 XSS 也叫“非持久型 XSS”（Non-persistent XSS)。

- 比如：直接将用户输入用于网站页面，URL 中的 Query， Params 或者 用户输入的信息直接拼接 DOM 节点等

- ```html
  <a href="http://localhost:3000/?name=<script>alert('hello')</script>"
    >点击进入网站并进行XSS攻击</a
  >
  ```

  如果目标网站直接将 url 中的 query.name 渲染到页面上，就会被攻击

### 存储型

- 存储型 XSS 会把用户输入的数据“存储”在服务器端（数据库）。存储型 XSS 通常也叫做“持久型 XSS”（Persistent XSS）

- 比如：用户发表的文章或评论中，可以输入恶意代码，发表成功存入数据库之后每个用户访问该文章或评论时，都会调用恶意代码，被劫持。

## 防御

常见的 Web 漏洞如 XSS，SQL 注入等，都要求攻击者输入一些特殊字符，所以可以通过输入检查，过滤掉这些字符。

- React、Vue 等都有对 XSS 进行处理

  - React `dangerouslySetInnerHTML` 会有风险

  - Vue `v-html` 会有风险

- GitHub 上有比较成熟的 XSS 库，可参考 [GitHub - XSS](https://github.com/leizongmin/js-xss)

- 防止 Cookie 被劫持

  Cookie 中设置 HttpOnly 之后，JS 将无法读取 Cookie 信息

- 对下列特殊字符进行过滤或者编码，可以简单的防范

  ```
  &  &amp;
  <  &lt;
  >  &gt;
  "  &quot;
  '  &#39
  ```
