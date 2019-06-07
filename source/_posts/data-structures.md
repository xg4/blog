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
