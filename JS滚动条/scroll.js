/**
 * 动态效果的滚动条：内容少的时候，滚动条就长，内容多的时候，滚动条就短
 */
function scrollBar() {
    var drag = document.getElementsByClassName('bar')[0];
    var scroll = document.getElementsByClassName('duration')[0];
    var container = document.getElementsByClassName('container')[0];
    var contents = document.getElementsByClassName('contents')[0];

    //用container的高度除以内容的高度，算出显示的比例，然后乘以滚动条的高度，取整得到滚动条的动态比例高度
    //如果内容过少，则不显示滚动条
    var dragH = Math.floor((container.offsetHeight / contents.offsetHeight) * scroll.offsetHeight);
    if (dragH >= 340) {
        drag.style.height = 340 + 'px';
        drag.style.backgroundColor = 'white';
    } else {
        drag.style.height = dragH + 'px';
    }
    //鼠标拖动事件函数
    dragScrollBar(drag, scroll);
    //点击事件
    btnScroll(drag, scroll);
    //滚轮事件
    wheelScroll(drag, scroll, container);
    /**
     * 
     * @param {*} item 滑块
     * @param {*} duration 滑动条运行的空间，既scroll
     */
    function dragScrollBar(item, duration) {
        item.onmousedown = function (e) {
            e = e || window.event;
            var topY = e.pageY; //鼠标点下去的点的Y值
            document.onmousemove = function (e) {
                var subY = e.pageY - topY;          //Y值的差值
                if (subY > 0) {
                    item.style.top = subY + item.offsetTop + 'px';
                    if ((item.offsetHeight + item.offsetTop + subY) >= duration.offsetHeight) {
                        item.style.top = (duration.offsetHeight - item.offsetHeight + 'px');
                    }
                } else {
                    item.style.top = subY + item.offsetTop + 'px';
                    if ((item.offsetTop + subY) <= 0) {
                        item.style.top = 0;
                    }

                }
                topY = e.pageY;
                goScroll(item);
            }
        }
        document.onmouseup = function (e) {
            document.onmousemove = null;
        }
    }
    //滚动条控制内容滚动
    //滚动条走了多少比例，乘以contents整体内容，得到contents要移动的长度
    function goScroll(item) {
        var scrollTop = scroll.offsetHeight - drag.offsetHeight;//滚动条的空白处（滚动条可以移动的高度）
        var contentTop = contents.offsetHeight - container.offsetHeight;//内容可以移动的高度
        var persent = Math.floor((item.offsetTop / scrollTop) * contentTop);
        contents.style.top = -persent + 'px';
    }
    function btnScroll(item, duration) {
        var box = document.getElementsByTagName('ul')[0];
        box.addEventListener('click', function (e) {
            if (e.target.className == 'up') {
                if (item.offsetTop <= 0) {
                    item.offsetTop = 0;
                } else {
                    if ((-10 + item.offsetTop < 0)) {
                        item.offsetTop = 0;
                    } else {
                        item.style.top = -10 + item.offsetTop + 'px';
                    }
                }
            } else if (e.target.className == 'down') {
                item.style.top = 10 + item.offsetTop + 'px';
                if ((item.offsetTop + item.offsetHeight) > duration.offsetHeight) {
                    item.style.top = duration.offsetHeight - item.offsetHeight + 'px';
                }
            }
            goScroll(item);
        })
    }
    function wheelScroll(item, duration, contain) {
        contain.addEventListener('mousewheel', goWheel);
        function goWheel(e) {
            e.preventDefault();//取消时间默认，防住滚动式，浏览器的滚动条也一起滚动
            if (e.wheelDelta >= 120) {//向上翻（可自定义）
                if (item.offsetTop <= 0) {
                    item.offsetTop = 0;
                } else {
                    if ((-10 + item.offsetTop < 0)) {
                        item.offsetTop = 0;
                    } else {
                        item.style.top = -10 + item.offsetTop + 'px';
                    }
                }
            } else {
                item.style.top = 10 + item.offsetTop + 'px';
                if ((item.offsetTop + item.offsetHeight) > duration.offsetHeight) {
                    item.style.top = duration.offsetHeight - item.offsetHeight + 'px';
                }
            }
            goScroll(item);
        }
    }
}