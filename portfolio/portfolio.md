### height: 100vh
Viewport units, like percentages, are relative units, but they are based off different items. Viewport units are relative to the viewport dimensions (width or height) of a device, and percentages are relative to the size of the parent container element.

vw (viewport width): 10vw would be 10% of the viewport's width.
vh (viewport height): 3vh would be 3% of the viewport's height.
vmin (viewport minimum): 70vmin would be 70% of the viewport's smaller dimension (height or width).
vmax (viewport maximum): 100vmax would be 100% of the viewport's bigger dimension (height or width).
### auto-fit & auto-fill

### 已知子元素宽高，实现子元素在父元素中垂直水平居中
1、子绝父相：利用父元素设置相对定位,子元素设置绝对定位,那么子元素就是相对于父元素定位的特性。
2、子元素左上角到父元素中心：子元素设置上和左偏移的值都为50%，是元素的左上角在父元素中心点的位置。效果：
3、向左上设置-margin：然后再用margin给上和左都给负的自身宽高的一半,就能达到垂直水平居中的效果。

### 未知子元素宽高，实现子元素在父元素中垂直水平居中
CSS 属性 translate 允许你单独指定 transforms 中的平移，并独立于 transform 属性。这可以更好地反映到典型的用户界面用法，并节省了在指定transform 值时必须记住的转换函数的确切顺序。
 .box {
        border: 1px solid #00ee00;
        height: 300px;
        position: relative;

    }

    .box1 {
        border: 1px solid red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
1、利用父元素设置相对定位,子元素设置绝对定位,那么子元素就是相对于父元素定位的特性。
2、子元素设置上和左偏移的值都为50%。
3、然后再用css3属性translate位移,给上和左都位移-50%距离，就能达到垂直水平居中的效果。