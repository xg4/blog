---
title: Javascript - String
date: 2019-07-12 00:00:03
tags:
  - js
  - string
---

## Table of Contents

- [Table of Contents](#Table-of-Contents)
- [String.prototype.charAt()](#StringprototypecharAt)
- [String.prototype.charCodeAt()](#StringprototypecharCodeAt)
- [String.fromCharCode()](#StringfromCharCode)
- [String.prototype.codePointAt()](#StringprototypecodePointAt)
- [String.fromCodePoint()](#StringfromCodePoint)

## String.prototype.charAt()

> 从字符串中返回指定的字符

- `str.charAt(index)`

- index: 介于 0 和字符串长度减 1 之间的整数 (0 ~ length-1) 。**如果不是一个数值，则默认为 0**

- 索引超出范围，则返回空字符串`''`

## String.prototype.charCodeAt()

> string 转 ASCII / Unicode， 返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元

- `str.charCodeAt(index)`

- index: 介于 0 和字符串长度减 1 之间的整数 (0 ~ length-1) 。**如果不是一个数值，则默认为 0**

- 索引超出范围，则返回 `NaN`

## String.fromCharCode()

## String.prototype.codePointAt()

## String.fromCodePoint()
