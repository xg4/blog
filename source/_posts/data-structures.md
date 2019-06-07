---
title: Data Structures
date: 2019-06-02 09:41:48
tags:
  - javascript
  - computer science
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Stack](#stack)
- [Queue](#queue)
  - [Priority Queue](#priority-queue)
- [Linked List](#linked-list)
  - [单向链表](#%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8)
  - [双向链表](#%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8)

## Stack

> 受限的线性结构，栈顶操作，LIFO (last in first out) 后进先出

可以基于 Array 和 List 实现

```ts
// 基于 Array 的 Stack
class Stack {
  public get length() {
    return this.stack.length
  }

  private stack: any[] = []

  public pop() {
    return this.stack.pop()
  }

  public push(data: any) {
    return this.stack.push(data)
  }

  public peek() {
    return this.stack[this.length - 1]
  }

  public isEmpty() {
    return !!this.length
  }

  public size() {
    return this.length
  }

  public toString() {
    return this.stack.map(item => item.toString()).join(',')
  }
}
```

## Queue

> 受限的线性结构，FIFO (first in first out) 先入先出

```ts
// 基于 Array 的 Queue
class Queue {
  public get length() {
    return this.queue.length
  }

  private queue: any[] = []

  public dequeue() {
    return this.queue.shift()
  }

  public enqueue(data: any) {
    return this.queue.push(data)
  }

  public front() {
    return this.queue[0]
  }

  public isEmpty() {
    return !!this.length
  }

  public size() {
    return this.length
  }

  public toString() {
    return this.queue.map(item => item.toString()).join(',')
  }
}
```

### Priority Queue

```ts
class Item {
  public data: any
  public level: number
  public constructor(data: any, level: number) {
    this.data = data
    this.level = level
  }
}

class Queue {
  public get length() {
    return this.queue.length
  }

  private queue: Item[] = []

  public dequeue() {
    return this.queue.shift()
  }

  public enqueue(data: any, level: number) {
    const item = new Item(data, level)
    const index = this.queue.findIndex(it => item.level > it.level)
    if (index !== -1) {
      this.queue.splice(index, 0, item)
    } else {
      this.queue.push(item)
    }
  }

  public front() {
    return this.queue[0].data
  }

  public isEmpty() {
    return !!this.length
  }

  public size() {
    return this.length
  }

  public toString() {
    return this.queue.map(item => item.data.toString()).join(',')
  }
}
```

## Linked List

### 单向链表

```ts
class Node {
  public data: any
  public next: Node | null
  public constructor(data: any) {
    this.data = data
    this.next = null
  }
}
class LinkedList {
  public static Node = Node
  private head: Node | null
  private length: number
  public constructor() {
    this.head = null
    this.length = 0
  }

  public append(data: any) {
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

  public insert(data: any, position: number) {
    if (position < 0 || position > this.length) {
      return false
    }

    const node = new Node(data)
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      let current = this.head as Node
      let prev = null
      let index = 0
      do {
        prev = current
        // current.next 可能为 null 或 Node
        current = current.next as Node
      } while (++index < position)
      node.next = current
      prev.next = node
    }
    this.length += 1
    return true
  }

  public get(position: number) {
    if (position < 0 || position >= this.length) return null
    let index = 0
    let current = this.head as Node
    while (index++ < position) {
      current = current.next as Node
    }
    return current.data
  }

  public indexOf(data: any) {
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

  public update(data: any, position: number) {
    if (position < 0 || position >= this.length) return false
    let index = 0
    let current = this.head as Node
    while (index++ < position) {
      current = current.next as Node
    }
    current.data = data
    return true
  }

  public removeAt(position: number) {
    if (position < 0 || position >= this.length) {
      return false
    }

    if (position === 0) {
      this.head = (this.head as Node).next
    } else {
      let index = 0
      let current = this.head as Node
      let prev = null
      do {
        prev = current
        current = current.next as Node
      } while (++index < position)

      prev.next = current.next
    }
    this.length -= 1

    return true
  }

  public remove(data: any) {
    const position = this.indexOf(data)
    return this.removeAt(position)
  }

  public size() {
    return this.length
  }

  public isEmpty() {
    return !this.length
  }

  public toString() {
    let current = this.head
    let str = ''
    while (current) {
      str += current.data.toString() + ' '
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
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(data) {
    const node = new Node(data)

    if (!this.head || !this.tail) {
      this.head = node
      this.tail = node
    } else {
      this.head.next = node
      node.prev = this.head
      this.tail = node
    }

    this.length += 1
  }

  insert(data, position) {
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
    do {
      current = current.next
    } while (++index < position)
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

  update(data, position) {
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
      str += current.data.toString() + ' '
      current = current.next
    }
    return str
  }
}
```
