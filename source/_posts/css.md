---
title: CSS
date: 2018-09-05 23:21:33
tags: css
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [ellipsis](#ellipsis)
- [clearfix](#clearfix)
- [hairline](#hairline)

## ellipsis

```less
/* 单行溢出隐藏 */
.ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行溢出隐藏 */
.multi-ellipsis(@lines) {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: @lines;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
```

- `-webkit-box-orient` 是一个过时的属性，postcss 一类的工具会将它默认移除，所以需要取消处理，不然不能起作用

- **多行适用范围**

  因使用了 WebKit 的 CSS 扩展属性，该方法适用于 WebKit 浏览器及移动端

- 注：

  1. `-webkit-line-clamp` 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性，常见结合属性：

  2. `display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示

  3. `-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式

## clearfix

> 清除浮动

```less
.clearfix() {
  zoom: 1;

  &::before,
  &::after {
    display: table;
    content: '';
  }

  &::after {
    clear: both;
  }
}
```

## hairline

> 移动端 1px border

```less
.hairline-common() {
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  content: ' ';
}

.hairline(@border-color: #ebedf0) {
  .hairline-common();

  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 dashed @border-color;
  transform: scale(0.5);
}

.hairline-bottom(@border-color: #ebedf0, @left: 0) {
  .hairline-common();

  right: 0;
  bottom: 0;
  left: @left;
  border-bottom: 1px solid @border-color;
  transform: scaleY(0.5);
}
```
