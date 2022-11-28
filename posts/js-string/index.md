---
title: Javascript - String
date: '2019-07-11T16:00:03.000Z'
description: Javascript - String
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Unicode](#unicode)
- [String.prototype.charAt()](#stringprototypecharat)
- [String.prototype.charCodeAt()](#stringprototypecharcodeat)
- [String.fromCharCode()](#stringfromcharcode)
- [String.prototype.codePointAt()](#stringprototypecodepointat)
- [String.fromCodePoint()](#stringfromcodepoint)

## Unicode

> Unicode 编码单元（code points）的范围从 0 到 1,114,111（0x10FFFF）。开头的 128 个 Unicode 编码单元和 ASCII 字符编码一样

## String.prototype.charAt()

> 从字符串中返回指定的字符

- `str.charAt(index)`

- index: 介于 0 和字符串长度减 1 之间的整数 (0 ~ length-1)

  - **如果不是一个数值，则默认为 0**

  - 索引超出范围（小于 0 或不小于字符串的长度），则返回 `''`

## String.prototype.charCodeAt()

> string 转 Unicode， 返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元，不能被一个 UTF-16 编码单元单独表示的情况下，需使用 codePointAt()

- `str.charCodeAt(index)`

- index: 介于 0 和字符串长度减 1 之间的整数 (0 ~ length-1)

  - **如果不是一个数值，则默认为 0**

  - 索引超出范围（小于 0 或不小于字符串的长度），则返回 `NaN`

## String.fromCharCode()

> String 的静态方法，返回由指定的 UTF-16 代码单元序列创建的字符串  
> 由于高位编码（higher values）字符是用两个低位编码（lower value）表示形成的一个字符，需要使用 String.fromCodePoint()

- `String.fromCharCode(num1[, ...[, numN]])`

- `num1, ..., numN`

  - 一系列 UTF-16 代码单元的数字。 范围介于 0 到 65535（0xFFFF）之间。 大于 0xFFFF 的数字将被截断。 不进行有效性检查

- 返回一个长度为 N 的字符串，由 N 个指定的 UTF-16 代码单元组成

## String.prototype.codePointAt()

> string 转 Unicode

- `str.codePointAt(pos)`

- pos: 介于 0 和字符串长度减 1 之间的整数 (0 ~ length-1)

  - **如果不是一个数值，则默认为 0**

  - 索引超出范围（小于 0 或不小于字符串的长度），则返回 `undefined`

## String.fromCodePoint()

> String 的静态方法

- `String.fromCodePoint(num1[, ...[, numN]])`

- `num1, ..., numN`

  - 一串 Unicode 编码位置，即“代码点”

- **传入无效的 Unicode 编码，会抛出异常**
