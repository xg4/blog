# css

- [Flex布局](#flex)

    > [Flex 布局教程：语法篇 - 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

- [超出部分显示省略号](#overflow)

<p id="flex"></p>

## # Flex

###  Flex布局

- 任何一个容器都可以指定为 Flex 布局。

```css
.box{
  display: flex;
}
```

- 行内元素也可以使用 Flex 布局。

```css
.box{
  display: inline-flex;
}
```

- Webkit 内核的浏览器，必须加上`-webkit`前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

**注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。**

#### 容器的属性

- 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

- 以下6个属性设置在容器上。

    - [`flex-direction`](#flex-direction)

    - [`flex-wrap`](#flex-wrap)

    - [`flex-flow`](#flex-flow)

    - [`justify-content`](#justify-content)

    - [`align-items`](#align-items)

    - [`align-content`](#align-content)

<p id="flex-direction"></p>

- flex-direction属性


    - `flex-direction`属性决定主轴的方向（即项目的排列方向）。

    ```css
    .box {
        flex-direction: row | row-reverse | column | column-reverse;
    }
    ```

    ![](./css/flex/flex-direction.png)

    - 它可能有4个值。

        - `row`（默认值）：主轴为水平方向，起点在左端。

        - `row-reverse`：主轴为水平方向，起点在右端。

        - `column`：主轴为垂直方向，起点在上沿。

        - `column-reverse`：主轴为垂直方向，起点在下沿。

<p id="flex-wrap"></p>

- flex-wrap属性

    - 默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

    ![](./css/flex/flex-wrap.png)

    ```css
    .box{
        flex-wrap: nowrap | wrap | wrap-reverse;
    }
    ```

    - 它可能取三个值。

        1. `nowrap`（默认）：不换行。

        ![](./css/flex/flex-wrap-nowrap.png)

        2. `wrap`：换行，第一行在上方。

        ![](./css/flex/flex-wrap-wrap.jpg)

        3. `wrap-reverse`：换行，第一行在下方。

        ![](./css/flex/flex-wrap-wrap-reverse.jpg)

<p id="flex-flow"></p>

- flex-flow属性

    - `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

    ```css
    .box {
        flex-flow: <flex-direction> || <flex-wrap>;
    }
    ```
<p id="justify-content"></p>

- justify-content属性

    - `justify-content`属性定义了项目在主轴上的对齐方式。

    ```css
    .box {
        justify-content: flex-start | flex-end | center | space-between | space-around;
    }
    ```

    ![](./css/flex/justify-content.png)

    - 它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

        - flex-start（默认值）：左对齐

        - flex-end：右对齐

        - center： 居中

        - space-between：两端对齐，项目之间的间隔都相等。

        - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

<p id="align-items"></p>

- align-items属性

    - `align-items`属性定义项目在交叉轴上如何对齐。

    ```css
    .box {
        align-items: flex-start | flex-end | center | baseline | stretch;
    }
    ```

    ![](./css/flex/align-items.png)

    - 它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

        - flex-start：交叉轴的起点对齐。

        - flex-end：交叉轴的终点对齐。

        - center：交叉轴的中点对齐。

        - baseline: 项目的第一行文字的基线对齐。

        - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

<p id="align-content"></p>

- align-content属性

    - `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

    ```css
    .box {
        align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    }
    ```

    ![](./css/flex/align-content.png)

    - 该属性可能取6个值。

        - flex-start：与交叉轴的起点对齐。

        - flex-end：与交叉轴的终点对齐。

        - center：与交叉轴的中点对齐。

        - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。

        - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

        - stretch（默认值）：轴线占满整个交叉轴。

#### 项目的属性

- 以下6个属性设置在项目上。

    - [order](#order)

    - [flex-grow](#flex-grow)

    - [flex-shrink](#flex-shrink)

    - [flex-basis](#flex-basis)

    - [flex](#flex)

    - [align-self](#align-self)

<p id="order"></p>

- order属性

    - `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

    ```css
    .item {
        order: <integer>;
    }
    ```

    ![](./css/flex/order.png)

<p id="flex-grow"></p>

- flex-grow属性

    - `flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

    ```css
    .item {
        flex-grow: <number>; /* default 0 */
    }
    ```

    ![](./css/flex/flex-grow.png)

    - 如果所有项目的`flex-grow`属性都为`1`，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为`2`，其他项目都为`1`，则前者占据的剩余空间将比其他项多一倍。

<p id="flex-shrink"></p>

- flex-shrink属性

    - `flex-shrink`属性定义了项目的缩小比例，默认为`1`，即如果空间不足，该项目将缩小。

    ```css
    .item {
        flex-shrink: <number>; /* default 1 */
    }
    ```

    ![](./css/flex/flex-shrink.jpg)

    - 如果所有项目的`flex-shrink`属性都为`1`，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为`0`，其他项目都为`1`，则空间不足时，前者不缩小。

    **负值对该属性无效。**

<p id="flex-basis"></p>

- flex-basis属性

    - `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

    ```css
    .item {
        flex-basis: <length> | auto; /* default auto */
    }
    ```

    - 它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

<p id="flex"></p>

- flex属性

    - `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

    ```css
    .item {
        flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    }
    ```

    - 该属性有两个快捷值：`auto` (`1 1 auto`) 和 `none` (`0 0 auto`)。

    - 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

<p id="align-self"></p>

- align-self属性

    - `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`

    ```css
    .item {
        align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
    ```

    ![](./css/flex/align-self.png)

    - 该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

<p id="overflow"></p>

## # 超出部分显示省略号

- 单行文本溢出显示省略号

    ```css
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    ```

- 多行文本溢出显示省略号

    ```css
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    ```

    - **适用范围**  
    因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；

    - 注：
    
        1. -webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：

        2. display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。

        3. -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。