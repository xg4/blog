---
title: js 数据结构
date: '2019-06-02T01:41:48.000Z'
description: js 数据结构
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Stack](#stack)
- [Queue](#queue)
  - [Priority Queue](#priority-queue)
- [Linked List](#linked-list)
  - [单向链表](#单向链表)
  - [双向链表](#双向链表)
- [集合](#集合)
- [Dictionary/Map](#dictionarymap)
- [Hash Table](#hash-table)
  - [Hash](#hash)
  - [冲突](#冲突)

## Stack

> 受限的线性结构，栈顶操作，LIFO (last in first out) 后进先出

可以基于 `Array` 和 `List` 实现

```js
// 基于 Array 的 Stack
class Stack {
  get length() {
    return this.stack.length
  }

  constructor() {
    this.stack = []
  }

  pop() {
    return this.stack.pop()
  }

  push(data) {
    return this.stack.push(data)
  }

  peek() {
    return this.stack[this.length - 1]
  }

  isEmpty() {
    return !this.length
  }

  size() {
    return this.length
  }

  toString() {
    return this.stack.map((item) => item.toString()).join(',')
  }
}
```

## Queue

> 受限的线性结构，FIFO (first in first out) 先入先出

队列可以基于 `Array` 或 `List` 实现

```js
// 基于 Array 的 Queue
class Queue {
  get length() {
    return this.queue.length
  }

  constructor() {
    this.queue = []
  }

  dequeue() {
    return this.queue.shift()
  }

  enqueue(data) {
    return this.queue.push(data)
  }

  front() {
    return this.queue[0]
  }

  isEmpty() {
    return !this.length
  }

  size() {
    return this.length
  }

  toString() {
    return this.queue.map((item) => item.toString()).join(',')
  }
}
```

### Priority Queue

```js
class Item {
  constructor(data, level = 0) {
    this.data = data
    this.level = level
  }

  toString() {
    return this.data.toString()
  }
}

class Queue {
  constructor() {
    this.queue = []
  }

  get length() {
    return this.queue.length
  }

  dequeue() {
    return this.queue.shift()
  }

  enqueue(data, level) {
    const item = new Item(data, level)
    const index = this.queue.findIndex((it) => item.level > it.level)
    if (index !== -1) {
      this.queue.splice(index, 0, item)
    } else {
      this.queue.push(item)
    }
  }

  front() {
    return this.queue[0].data
  }

  isEmpty() {
    return !this.length
  }

  size() {
    return this.length
  }

  toString() {
    return this.queue.map((item) => item.toString()).join(',')
  }
}
```

## Linked List

### 单向链表

```js
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }

  toString() {
    return this.data.toString()
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  append(data) {
    const node = new Node(data)

    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }

    this.length += 1
  }

  insert(position, data) {
    if (position < 0 || position > this.length) {
      return false
    }

    const node = new Node(data)
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      let current = this.head
      let prev = null
      let index = 0
      while (index++ < position) {
        prev = current
        current = current.next
      }
      node.next = current
      prev.next = node
    }
    this.length += 1
    return true
  }

  get(position) {
    if (position < 0 || position >= this.length) return null
    let index = 0
    let current = this.head
    while (index++ < position) {
      current = current.next
    }
    return current.data
  }

  indexOf(data) {
    let current = this.head
    let index = 0

    while (current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index += 1
    }

    return -1
  }

  update(position, data) {
    if (position < 0 || position >= this.length) return false
    let index = 0
    let current = this.head
    while (index++ < position) {
      current = current.next
    }
    current.data = data
    return true
  }

  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false
    }

    if (position === 0) {
      this.head = this.head.next
    } else {
      let index = 0
      let current = this.head
      let prev = null
      while (index++ < position) {
        prev = current
        current = current.next
      }

      prev.next = current.next
    }
    this.length -= 1

    return true
  }

  remove(data) {
    const position = this.indexOf(data)
    return this.removeAt(position)
  }

  size() {
    return this.length
  }

  isEmpty() {
    return !this.length
  }

  toString() {
    let current = this.head
    let str = ''
    while (current) {
      str += current.toString() + ','
      current = current.next
    }
    return str
  }
}
```

### 双向链表

```js
class Node {
  constructor(data) {
    this.prev = null
    this.data = data
    this.next = null
  }

  toString() {
    return this.data.toString()
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(data) {
    const node = new Node(data)

    if (!this.length) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }

    this.length += 1
  }

  insert(position, data) {
    if (position < 0 || position > this.length) {
      return false
    }

    const node = new Node(data)
    if (!this.head || !this.tail) {
      this.head = node
      this.tail = node
      this.length += 1
      return true
    }
    if (position === 0) {
      this.head.prev = node
      node.next = this.head
      this.head = node
      this.length += 1
      return true
    }

    if (position === this.length) {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
      this.length += 1
      return true
    }

    let current = this.head
    let index = 0
    while (index++ < position) {
      current = current.next
    }
    node.next = current
    node.prev = current.prev
    current.prev.next = node
    current.prev = node
    this.length += 1
    return true
  }

  getNode(position) {
    if (position < 0 || position >= this.length) return null

    const flag = this.length / 2 > position
    if (flag) {
      let index = 0
      let current = this.head
      while (index++ < position) {
        current = current.next
      }
      return current
    } else {
      let index = this.length
      let current = this.tail
      while (index-- < position) {
        current = current.next
      }
      return current
    }
  }

  get(position) {
    const node = this.getNode(position)
    return node ? node.data : null
  }

  indexOf(data) {
    let current = this.head
    let index = 0

    while (current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index += 1
    }

    return -1
  }

  update(position, data) {
    const node = this.getNode(position)
    if (!node) {
      return false
    }
    node.data = data
    return true
  }

  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false
    }

    if (this.length === 1) {
      this.head = null
      this.tail = null
      this.length -= 1
      return true
    }

    if (position === 0) {
      this.head.next.prev = null
      this.head = this.head.next

      this.length -= 1
      return true
    }

    if (position === this.length - 1) {
      this.tail.prev.next = null
      this.tail = this.tail.prev

      this.length -= 1
      return true
    }

    let index = 0
    let current = this.head
    while (index++ < position) {
      current = current.next
    }

    current.prev.next = current.next
    current.next.prev = current.prev

    this.length -= 1
    return true
  }

  remove(data) {
    const position = this.indexOf(data)
    return this.removeAt(position)
  }

  size() {
    return this.length
  }

  isEmpty() {
    return !this.length
  }

  toString() {
    let current = this.head
    let str = ''
    while (current) {
      str += current.toString() + ','
      current = current.next
    }
    return str
  }
}
```

## 集合

> 集合常见的实现方式是`哈希表`

- 集合通常是由一组无序的，不能重复的元素构成

- 特殊的数组：没有顺序，不能重复

  - 没有顺序意味着不能通过下标进行访问

  - 不能重复意味着相同的对象在集合中只会存在一份

**ES6 中包含了 `Set` 类**

## Dictionary/Map

> key-value, key 不允许重复，无序

**ES6 中包含了 `Map` 类**

## Hash Table

> 通过 hash 函数，生成 key

- 哈希表通常是基于 `Array` 实现的

  - 提供比数组更快的插入-删除-查找操作

  - 哈希表的速度比树还快

- 哈希表是无序的，且 key 不允许重复

### Hash

> ASCII Unicode

- 哈希化：将大数字（幂的连乘生成的唯一大数字）转化成数组范围内下标的过程

- 哈希函数：单词转成大数字，大数字进行哈希化的函数

- 哈希表：最终将数据插入到数组中，对整个结构的封装

### 冲突

链地址法（拉链法）

开放地址法

- 线性探测（问题：聚集）

- 二次探测

- 再哈希法

  - stepSize = constant - (key % constant)

  - constant 是质数，且小于数组的容量
