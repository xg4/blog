---
title: CSS Center
date: 2019-06-29 23:05:06
tags: css
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [竖直居中](#%E7%AB%96%E7%9B%B4%E5%B1%85%E4%B8%AD)
  - [flex](#flex)
  - [line-height](#line-height)
  - [::before ::after](#before-after)
  - [calc](#calc)
  - [transform](#transform)
  - [absolute](#absolute)
  - [table](#table)
- [水平集中](#%E6%B0%B4%E5%B9%B3%E9%9B%86%E4%B8%AD)
  - [块级元素](#%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0)
  - [行内元素](#%E8%A1%8C%E5%86%85%E5%85%83%E7%B4%A0)
  - [flex](#flex-1)

## 竖直居中

### flex

标准的竖直居中方式，适用于 IE10+ 和 现代浏览器

```css
.parent {
  display: flex;
  align-items: center;
}
```

### line-height

- 必须是单行

- 子元素必须是行内元素(inline, inline-block)

- 父元素已知高度

```css
.parent {
  height: 100px;
  line-height: 100px;
}

.child {
  display: inline;
}
/* or */
.child {
  display: inline-block;
  height: 10px;
  line-height: 10px;
}
```

### ::before ::after

- 子元素必须是行内元素

```css
.parent::before {
  content: '';
  width: 0;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
```

### calc

- 已知子元素的高度

- 竖直居中的 top 值为 50% - (height / 2)

```css
.child {
  width: 30px;
  height: 30px;
  position: relative;
  top: calc(50% - 15px);
}
```

### transform

通用的竖直居中，适用于 IE9+ 和 现代浏览器

```css
.child {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

### absolute

- 因为绝对定位的元素是会互相覆盖的，所以只适用于单个子元素

- 必须指定子元素的高度，子元素没有高度就是 100%

```css
.parent {
  position: relative;
}

.child {
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

### table

模拟 table 的竖直居中

```css
.parent {
  display: table-cell;
  vertical-align: middle;
}
```

## 水平集中

### 块级元素

```css
.child {
  display: block;
  margin: 0 auto;
}
```

### 行内元素

```css
.parent {
  text-align: center;
}
```

### flex

```css
.parent {
  display: flex;
  justify-content: center;
}
```
