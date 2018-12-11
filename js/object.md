# object

> [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Table of Contents

- [Object.defineProperty](#Object.defineProperty)

- [Object.freeze](#Object.freeze)

  - [Object.isFrozen](#Object.isFrozen)

- [Object.seal](#Object.seal)

  - [Object.isSealed](#Object.isSealed)

- [Object.preventExtension](#Object.preventExtension)

  - [Object.isExtensible](#Object.isExtensible)

### Object.defineProperty

```js
/**
 * @description 方法会直接在一个对象上定义一个新属性
 * 或者修改一个对象的现有属性，
 * 并返回这个对象
 * @param {Object} obj 要在其上定义属性的对象
 * @param {} prop 要定义或修改的属性的名称
 * @param {} descriptor 将被定义或修改的属性描述符
 * @return {Object} 被传递给函数的对象
 */
Object.defineProperty(obj, prop, descriptor)
```

#### descriptor

> 对象里目前存在的属性描述符有两种主要形式：**数据描述符**和**存取描述符**。**数据描述符**是一个具有值的属性，该值可能是可写的，也可能不是可写的。**存取描述符**是由 getter-setter 函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。

**数据描述符和存取描述符均具有**以下可选键值：

- configurable

  当且仅当该属性的 configurable 为 `true` 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 `false`

- enumerable

  当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 `false`

**数据描述符同时具有以下可选键值：**

- value

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 `undefined`

- writable

  当且仅当该属性的 writable 为 true 时，value 才能被赋值运算符改变。默认为 `false`

**存取描述符同时具有以下可选键值：**

- get

  一个给属性提供 getter 的方法，如果没有 getter 则为 `undefined`。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入 `this` 对象（由于继承关系，这里的 `this` 并不一定是定义该属性的对象）

  默认为 `undefined`

- set

  一个给属性提供 setter 的方法，如果没有 setter 则为 `undefined`。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值

  默认为 `undefined`

#### 描述符可同时具有的键值

|            | configurable | enumerable | value | writable | get | set |
| ---------- | ------------ | ---------- | ----- | -------- | --- | --- |
| 数据描述符 | Yes          | Yes        | Yes   | Yes      | No  | No  |
| 存取描述符 | Yes          | Yes        | No    | No       | Yes | Yes |

> 如果一个描述符不具有 value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value 或 writable)和(get 或 set)关键字，将会产生一个异常。

### Object.preventExtension

> 如果一个对象可以添加新的属性，则这个对象是可扩展的。`Object.preventExtensions()`将对象标记为不再可扩展，因此它将永远不会具有超出它被标记为不可扩展的属性。注意，一般来说，不可扩展对象的属性可能仍然可被删除。尝试将新属性添加到不可扩展对象将静默失败或抛出 TypeError（最常见但不排除其他情况，如在 strict mode 中）。  
> `Object.preventExtensions()`仅阻止添加自身的属性。但属性仍然可以添加到对象原型。  
> 一旦使其不可扩展，就无法再对象进行扩展。

```js
/**
 * @description 方法让一个对象变的不可扩展，
 * 也就是永远不能再添加新的属性
 * @param {Object} 将要变得不可扩展的对象
 * @return {Object} 已经不可扩展的对象
 */
Object.preventExtensions(obj)
```

### Object.isExtensible

> 默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 `__proto__` 属性可以被更改。`Object.preventExtensions`，`Object.seal` 或 `Object.freeze` 方法都可以标记一个对象为不可扩展（non-extensible）。

```js
/**
 * @description  方法判断一个对象是否是可扩展的
 * （是否可以在它上面添加新的属性）
 * @param {Object} 需要检测的对象
 * @return {Boolean} 表示给定对象是否可扩展
 */
Object.isExtensible(obj)
```

### Object.freeze

> 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

```js
/**
 * @description 被冻结对象自身的所有属性都不可能以任何方式被修改。
 * 任何修改尝试都会失败，无论是静默地还是通过抛出TypeError异常
 * @param {Object} 要被冻结的对象
 * @return {Object} 被冻结的对象
 */
Object.freeze(obj)
```

1. 给对象设置，`Object.preventExtension(obj)`禁止更改原型，禁止添加属性

2. 为对象的每一个属性设置，`writable:false`禁止更改属性值

3. 为对象的每一个属性设置，`configurable:false`禁止删除属性

> **注：**  
> 禁止添加属性，是 `Object.preventExtensions` 控制的  
> 而禁止删除属性，是 `configuable:false` 控制的。  
> 用 `Object.seal()`密封的对象可以改变它们现有的属性，使用 `Object.freeze()` 冻结的对象中现有属性是不可变的。

### Object.isFrozen

> 一个对象是冻结的是指它不可扩展，所有属性都是不可配置的，且所有数据属性（即没有 `getter` 或 `setter` 组件的访问器的属性）都是不可写的。

```js
/**
 * @description 方法判断一个对象是否被冻结
 * @param {Object} 被检测的对象
 * @return {Boolean} 表示给定对象是否被冻结
 */
Object.isFrozen(obj)
```

### Object.seal

```js
/**
 * @description 封闭一个对象
 * 阻止添加新属性并将所有现有属性标记为不可配置
 * 当前属性的值只要可写就可以改变
 * @param {Object} 将要被密封的对象
 * @return {Object} 被密封的对象
 */
Object.seal(obj)
```

1. 给对象设置，`Object.preventExtension(obj)`，
   禁止更改原型，禁止添加属性

2. 为对象的每一个属性设置，`configurable:false`，
   禁止更改属性值

> 与 `Object.freeze` 不同的是，`Object.seal` 后的对象是可写的 `writable:true`,可以改变其现有属性。

### Object.isSealed

> 如果这个对象是密封的，则返回`true`，否则返回`false`。密封对象是指那些不可扩展的，且所有自身属性都不可配置且因此不可删除（但不一定是不可写）的对象。

```js
/**
 * @description 方法判断一个对象是否被密封
 * @param {Object} 被检测的对象
 * @return {Boolean} 表示给定对象是否被密封
 */
Object.isSealed(obj)
```
