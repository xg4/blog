---
title: CSS - Name
date: 2018-09-13 16:38:12
tags: css
---

- [BEM 命名模式](#bem-%E5%91%BD%E5%90%8D%E6%A8%A1%E5%BC%8F)
- [LESS SCSS](#less-scss)
- [Tips](#tips)
- [Example](#example)
- [常用命名](#%E5%B8%B8%E7%94%A8%E5%91%BD%E5%90%8D)

> BEM 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论

## BEM 命名模式

```css
.block {
}

.block__element {
}

.block--modifier {
}
```

- 每一个块(block)名应该有一个命名空间（前缀）

- block 代表了更高级别的抽象或组件

- `block__element` 代表 `.block` 的后代，用于形成一个完整的 `.block` 的整体

- `block--modifier` 代表 `.block` 的不同状态或不同版本。
  使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定。如：

  ```css
  .sub-block__element {
  }

  .sub-block--modifier {
  }
  ```

## LESS SCSS

```less
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

## Tips

- 避免 `.block__el1__el2` 的格式

- 在深层次嵌套的 DOM 结构下，应避免过长的样式名称定义

- 层级最后不要超过 4 级，不然增加阅读的理解难度

## Example

```less
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
  <li class="xxx__item">
    第一项
    <div class="xxx__product-name">我是名称</div>
    <span class="xxx__ming-zi-ke-yi-hen-chang">
      看类名
    </span>
    <a href="#" class="xxx__link">我是link</a>
  </li>
  <li></li>
  <li class="xxx__item xxx__item_current">
    第二项 且 当前选择项
    <div class="xxx__product-name">我是名称</div>
    <a href="#" class="xxx__item-link">我是link</a>
  </li>
  <li></li>
  <li class="xxx__item xxx__item_hightlight">
    第三项 且 特殊高亮
    <div class="xxx__product-name">我是名称</div>
    <a href="#" class="xxx__item-link">我是link</a>
  </li>
  <li></li>
</ul>
```

## 常用命名

| 名称                  | 作用                                |
| --------------------- | ----------------------------------- |
| .wrap 或 .wrapper     | 外侧包裹                            |
| .container            | 包裹容器                            |
| .header               | 用于头部                            |
| .body                 | 页面 body                           |
| .footer               | 页面尾部                            |
| .aside 或 .sidebar    | 用于侧边栏                          |
| .content              | 和 header footer 对应，用于主要内容 |
| .navigation           | 导航元素                            |
| .pagination           | 分页                                |
| .tabs > .tab          | tab 切换                            |
| .breadcrumbs          | 导航列表、面包屑                    |
| .dropdown             | 下拉菜单                            |
| .article              | 文章                                |
| .main                 | 用于主体                            |
| .media                | 媒体资源                            |
| .thumbnail 或 .avatar | 头像，小图像                        |
| .panel                | 面板                                |
| .tooltip              | 鼠标放置上去的提示                  |
| .popup                | 鼠标点击弹出的提示                  |
| .button 或 .btn       | 按钮                                |
| .ad                   | 广告                                |
| .subnav               | 二级导航                            |
| .menu                 | 菜单                                |
| .tag                  | 标签                                |
| .message 或 .notice   | 提示消息                            |
| .summary              | 摘要                                |
| .logo                 | logo                                |
| .search               | 搜索框                              |
| .login                | 登录                                |
| .register             | 注册                                |
| .banner               | 广告条                              |
| .copyright            | 版权                                |
| .modal 或 .dialog     | 弹窗                                |
