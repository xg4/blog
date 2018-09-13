# BEM

> Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

## BEM 命名模式

BEM 命名约定的模式是：

```css
.block {
}

.block__element {
}

.block--modifier {
}
```

- 每一个块(block)名应该有一个命名空间（前缀）

- block 代表了更高级别的抽象或组件。
- block\_\_element 代表 .block 的后代，用于形成一个完整的 .block 的整体。
- block--modifier 代表 .block 的不同状态或不同版本。
  使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定。如：

```css
.sub-block__element {
}

.sub-block--modifier {
}
```

## SCSS LESS

```css
.article {
  max-width: 1200px;
  &__body {
    padding: 20px;
  }
  &__button {
    padding: 5px 8px;
    &--primary {
      background: blue;
    }
    &--success {
      background: green;
    }
  }
}
```

## 避免 .block**el1**el2 的格式

- 在深层次嵌套的 DOM
- 结构下，应避免过长的样式名称定义。
- 层级最后不要超过 4 级，不然增加阅读的理解难度

```css
/* 常规写法： */

.xxx {
}
.xxx__item {
}
.xxx__item_current {
}

/* 嵌套写法 */
.xxx__item_current .mod-xxx__link {
}
/* 推荐： */

.xxx {
}
.xxx__item {
}
.xxx__item_hightlight {
}
.xxx__product-name {
}
.xxx__link {
}
.xxx__ming-zi-ke-yi-hen-chang {
}

/* 嵌套写法 */
.xxx__item_current {
  .xxx__link {
  }
}
```

```html
<!-- 对应的HTML结构如下： -->
<ul class="xxx">
    <li class="xxx__item">第一项
        <div class="xxx__product-name">我是名称</div>
        <span class="xxx__ming-zi-ke-yi-hen-chang">看类名</span>
        <a href="#" class="xxx__link">我是link</a>
    <li>
    <li class="xxx__item xxx__item_current">第二项 且 当前选择项
        <div class="xxx__product-name">我是名称</div>
        <a href="#" class="xxx__item-link">我是link</a>
    <li>
    <li class="xxx__item xxx__item_hightlight">第三项 且 特殊高亮
         <div class="xxx__product-name">我是名称</div>
        <a href="#" class="xxx__item-link">我是link</a>
    <li>
</ul>
```
