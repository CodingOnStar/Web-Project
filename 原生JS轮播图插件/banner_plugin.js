/**
 * 
 * @param {*} areaDOM 轮播图区域
 * @param {*} options 播放轮播图的配置
 */

function createBannerArea(areaDOM, options) {
    var imageArea = document.createElement('div');
    var numberArea = document.createElement('div');
    var curIndex = 0;   //显示当前是第几个轮播图
    var changeTimer = null; //自动切换的计时器
    var changeDuration = 3000;//切换的间隔时间
    var timer = null;//动画计时器
    //1.创建轮播图的区域，用于显示图片

    initImg();
    //2.设置角标
    initNumber();
    //3.角标状态
    setStatus();
    //4.自动切换
    autoChange();

    //此函数设置轮播图的区域，并显示图片
    function initImg() {
        imageArea.style.width = '100%';
        imageArea.style.height = '100%';
        imageArea.style.display = 'flex';
        imageArea.style.overflow = "hidden";
        for (let i = 0; i < options.length; i++) {
            const obj = options[i];
            var img = document.createElement('img');
            img.src = obj.imgUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.marginLeft = "0";
            imageArea.appendChild(img);
        }
        areaDOM.addEventListener('mouseenter', function () {
            clearInterval(changeTimer);
            changeTimer = null;
        })
        areaDOM.addEventListener('mouseleave', function () {
            autoChange();
        })
        areaDOM.appendChild(imageArea);
    }
    //此函数设置角标的样式
    function initNumber() {
        numberArea.style.textAlign = 'center';
        numberArea.style.marginTop = "-25px";
        for (let i = 0; i < options.length; i++) {
            var sp = document.createElement('span');
            sp.style.width = "12px";
            sp.style.height = "12px";
            sp.style.backgroundColor = "lightgrey";
            sp.style.display = "inline-block";
            sp.style.marginLeft = "7px";
            sp.style.borderRadius = "50%";
            sp.style.cursor = "pointer";
            sp.addEventListener("click", function () {
                curIndex = i;
                setStatus();
            })
            /* 
            (function (index) {
                sp.addEventListener("click", function () {
                    curIndex = index;
                    setStatus();
                })
            })(i)//此处在创建i时，直接设置为let即可
            */
            numberArea.appendChild(sp);
        }
        areaDOM.appendChild(numberArea);
    }
    //此函数设置角标和图片的状态
    function setStatus() {
        //1.角标的状态
        for (var i = 0; i < numberArea.children.length; i++) {
            if (i === curIndex) {
                //显示选中时角标的背景颜色
                numberArea.children[i].style.backgroundColor = "#be926f"
            } else {
                //设置普通状态时角标的背景颜色
                numberArea.children[i].style.backgroundColor = "lightgrey"
            }
        }
        //2.图片的状态
        var targetMarginLeft = curIndex * -100;
        imageArea.children[0].style.marginLeft = targetMarginLeft + "%";
        imageArea.children[0].style.transition = "margin-left 1s ease-out";//此处使用CSS3中transition即可
        /*
        var start = parseInt(imageArea.children[0].style.marginLeft);
        var end = curIndex * -100;
        var distance = end - start;
        var duration = 500;
        var speed = distance / duration;
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function () {
            start += speed * 20;
            imageArea.children[0].style.marginLeft = start + "%";//设置第1张图片即可，到第几张，就想左移动多少*100%
            if (Math.abs(end - start) < 1) { //当目标位置和当前位置小于一个像素的时候
                imageArea.children[0].style.marginLeft = end + "%"; //要设置为目标位置，因为判断条件是1像素，所以小于1像素时，如果不设置为目标位置，会有误差
                clearInterval(timer);
            }
        }, 20)
        */
    }
    //此函数设置图片和角标自动切换
    function autoChange() {
        if (changeTimer) {
            return; //如果已经开始计时了，就停止再次计时
        }
        changeTimer = setInterval(function () {
            if (curIndex === options.length - 1) {
                curIndex = 0;
            } else {
                curIndex++;
            }
            setStatus();
        }, changeDuration);
    }
}