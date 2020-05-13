# 什么是 CSS 清除浮动？

在非 IE 浏览器（如 Firefox）下，当容器的高度为 auto，且容器的内容中有浮动（float 为 left 或 right）的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的 CSS 处理，就叫 CSS 清除浮动。

# 清除浮动方法

## 方法一：使用带 clear 属性的空元素

在浮动元素后使用一个空元素如

```html
<div class="clear"></div>
```

并在 CSS 中赋予.clear{clear:both;}属性即可清理浮动。亦可使用

```html
<br class="clear" />
或
<hr class="clear" />
```

来进行清理。

```css
.news {
  background-color: gray;
  border: solid 1px black;
}
.news img {
  float: left;
}
.news p {
  float: right;
}
.clear {
  clear: both;
}
```

```html
<div class="news">
  <img src="news-pic.jpg" />
  <p>some text</p>
  <div class="clear"></div>
</div>
```

优点：简单，代码少，浏览器兼容性好。
缺点：需要添加大量无语义的 html 元素，代码不够优雅，后期不容易维护。

## 方法二：使用 CSS 的 overflow 属性

给浮动元素的容器添加 overflow:hidden;或 overflow:auto;可以清除浮动，另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom:1。

在添加 overflow 属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果。

```css
.news {
  background-color: gray;
  border: solid 1px black;
  overflow: hidden;
  *zoom: 1;
}

.news img {
  float: left;
}

.news p {
  float: right;
}
```

```html
<div class="news">
  <img src="news-pic.jpg" />
  <p>some text</p>
</div>
```

## 方法三：给浮动的元素的容器添加浮动

给浮动元素的容器也添加上浮动属性即可清除内部浮动，但是这样会使其整体浮动，影响布局，不推荐使用。

## 方法四：使用邻接元素处理

什么都不做，给浮动元素后面的元素添加 clear 属性。

## 方法五：使用 CSS 的:after 伪元素

结合 :after 伪元素（注意这不是伪类，而是伪元素，代表一个元素之后最近的元素）和 IEhack ，可以完美兼容当前主流的各大浏览器，这里的 IEhack 指的是触发 hasLayout。
给浮动元素的容器添加一个 clearfix 的 class，然后给这个 class 添加一个:after 伪元素实现元素末尾添加一个看不见的块元素（Block element）清理浮动。

```css
.news {
  background-color: gray;
  border: solid 1px black;
}

.news img {
  float: left;
}

.news p {
  float: right;
}

.clearfix:after {
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
```

```html
<div class="news clearfix">
  <img src="news-pic.jpg" />
  <p>some text</p>
</div>
```
