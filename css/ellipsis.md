# ellipsis

## table of contents

- [Single](#Single)

- [Multi](#Multi)

## Single

```css
.box {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Multi

```css
.box {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

- **适用范围**

  因使用了 WebKit 的 CSS 扩展属性，该方法适用于 WebKit 浏览器及移动端；

- 注：

  1. `-webkit-line-clamp` 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性。常见结合属性：

  2. `display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。

  3. `-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
