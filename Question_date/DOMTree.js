//返回输入结点elem的第n个父级结点
function retParent(elem, n) {
    while (elem && n) { //如果n大于层数，则返回null
        elem = elem.parentElement;
        n--;
    }
    return
}
//封装children，使其具有兼容性
Element.prototype.myChildren = function () {
    var child = this.childNodes();
    var len = child.length;
    var arr = [];
    for (let i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            arr.push(child[i]);
        }
    }
    return arr;
}
//封装函数返回第n个兄弟结点，n为正数时，返回后面的第n个，负数返回前面的第n个，0返回自己
function retSibling(elem, n) {
    while (elem && n) {
        if (n > 0) {
            if (elem.nextElementSibling) {//保证IE9一下的兼容性
                elem = elem.nextElementSibling;
            } else {
                for (elem = elem.nextSibling; elem && elem.nodeType != 1; elem = elem.nextSibling) { };
                //while(elem.nodeType != 1){elem = elem.nextSibling;}
            }
            n--;
        } else {
            if (elem.previousElementSibling) {
                elem = elem.previousElementSibling;
            } else {
                while (elem && elem.nodeType != 1) { elem = elem.previousSibling };
            }
            n++;
        }
    }
    return elem;
}
//封装insertAfter 
Element.prototype.insertAfter = function (targetNode, AfterNode) {
    beforeNode = AfterNode.nextElementSibling;
    if (beforeNode != null) {
        this.insertBefore(targetNode, beforeNode);
    } else {
        this.appendChild(targetNode);
    }
}
//getScrollOffset
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.documentElement.scrollLeft + document.body.scrollLeft,
            y: document.documentElement.scrollTop + document.body.scrollTop
        }
    }
}
//getViewPort
function getViewPort() {
    if (window.innerWidth) {
        return {
            x: window.innerWidth,
            y: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                x: document.body.clientWidth,
                y: document.body.clientHeight
            }
        } else {
            return {
                x: document.documentElement.clientWidth,
                y: document.documentElement.clientHeight
            }
        }
    }
}
//封装addEventListener，使其具有兼容性
function addClick(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
//封装取消冒泡
/*
例：div.onclick = function(e){
    stopBubble(e);
    ...
    ...
}
*/
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
//封装阻止默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
/*事件委托：利用事件和事件源对象进行处理
div.onclick = function(e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    target....
}
优点：
1.性能，不需要循环所有元素一个个绑定事件
2.灵活，当有新的元素时，不需要重新绑定事件
*/

//封装drag
function drag(elem) {
    var disX, disY;
    elem.addEventListener('mousedown', function (e) {
        var event = e || window.event;
        disX = event.pageX - parseInt(elem.style.left); //这两者用于计算点击时鼠标的坐标和div左上角的距离
        disY = event.pageY - parseInt(elem.style.top); //之后在拖动时，也要让鼠标和左上角时始终保持此距离
        function mouseUpTest(elem, event) {
            elem.style.left = event.pageX - disX + 'px';
            elem.style.top = event.pageY - disY + 'px';
        }
        document.addEventListener('mousemose', mouseUpTest(elem, event), false);
        //此处用document，使得当鼠标离开div时，也能使div跟随 
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', mouseUpTest)
        })
    }, false);
}
//区别drag和click
var firstTime = 0;
var lastTime = 0;
var key = false;
document.onmousedown = function () {
    firstTime = new Date().getTime();
}
document.onmouseup = function () {
    lastTime = new Date().getTime();
    if (lastTime - firstTime < 300) {
        key = true;
    }
}
document.click = function () {
    if (key) {
        console.log('click');
        key = false;
    }
}
//封装加载script外部文件
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readystate) {
        script.onreadystatechange = function () {//readyState改变时，才会触发的事件
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
                callback()
            }
        }
    } else {
        script.onload = function () {
            callback()//执行url中的代码//chrome Firefox Safari Opera //IE使用状态位readystate
        }
    }
    script.src = url //在上面先绑定事件，防止src直接加载完成无法触发事件
    document.head.appendChild(script);
}
loadScript(pre_run.js, function () {
    type()
})//执行时,利用匿名函数执行引入文件中的callback函数（因为执行时loadScript时，外部文件还未加载完成，如果直接调用函数，参数会报引用错误）
//或者传入字符串，用eval解析；或者把外部文件的函数封装进对象中，之后传入字符串，用Object[callback]解析
