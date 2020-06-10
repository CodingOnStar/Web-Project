/**
 * 所有图片要绝对定位
 * 使用JS来定位图片
 * 所有图片等宽
 * 图片的异步加载：当图片设置了src时，会异步加载
 * 
 * @param {*} areaDOM 图片展示的区域
 * @param {*} url 图片的地址
 * @param {*} imgWidth 每张图片的宽度
 */
function createWaterFall(areaDOM, url, imgWidth) {
    var columnNumber;//有多少列图片
    var gap;//每列图片的间隙

    //创建图片的区域
    createImgsDOM();
    //决定图片的位置
    setImgPosition();
    //窗口改变时间
    window.onresize = function () {
        var timer;
        if (timer) {
            clearInterval(timer);
        } else {
            timer = setInterval(function () {
                setImgPosition();
            }, 600)
        }
    }



    //创建图片的区域
    function createImgsDOM() {
        for (let i = 0; i < url.length; i++) {
            const img = document.createElement('img');
            img.src = url[i];
            img.style.width = imgWidth + 'px';
            img.style.position = 'absolute';
            img.onload = function () {
                setImgPosition();//使图片每加载一张就重新布局
            }
            areaDOM.appendChild(img);


        }
    }
    //决定图片的位置
    function setImgPosition() {
        cal();
        var colY = new Array(columnNumber);//保存每一列下一张图片起始的y坐标
        colY.fill(0);   //初始为0
        for (var i = 0; i < areaDOM.children.length; i++) {
            var img = areaDOM.children[i];
            //找到colY中的最小值，然后插入图片
            var y = Math.min(...colY);//ES6中的展开方法
            var index = colY.indexOf(y);
            //x坐标
            var x = (index + 1) * gap + index * imgWidth;
            img.style.left = x + 'px';
            img.style.top = y + 'px';

            //更新数组
            colY[index] += parseInt(img.height) + gap;
        }
        //手动解决div塌陷的问题
        var height = Math.max(...colY);
        areaDOM.style.height = height + 'px';

    }
    //计算列数和位置
    function cal() {
        var containerWidth = parseInt(areaDOM.clientWidth);
        columnNumber = Math.floor((containerWidth / imgWidth));
        var space = containerWidth - columnNumber * imgWidth;//剩余空间
        gap = space / (columnNumber + 1);
    }
}






