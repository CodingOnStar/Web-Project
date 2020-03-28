/*
 * @Author: Hanxu Jiang 
 * @Date: 2020-03-27 20:52:32 
 * @Last Modified by: Hanxu Jiang
 * @Last Modified time: 2020-03-28 23:08:43
 */
var timer = null;
var animateList = [];
var container = document.querySelector('.container');
var preOrder = document.querySelector('#preOrder');
var inOrder = document.querySelector('#inOrder');
var postOrder = document.querySelector('#postOrder');


//add Event
//IE7和8不支持addEventListener和removeEventListener，取而代之的是attachEvent和detachEvent
function addClick(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

var orderItems = {
    preOrder(node) {
        if (node != null) {
            //这里不能写while(node)，想一想为什么
            animateList.push(node);
            if (node.firstElementChild) {
                this.preOrder(node.firstElementChild);
            }
            if (node.lastElementChild) {
                this.preOrder(node.lastElementChild);
            }
        }
    },
    inOrder(node) {
        if (node != null) {
            if (node.firstElementChild) {
                this.inOrder(node.firstElementChild);
            }

            animateList.push(node);

            if (node.lastElementChild) {
                this.inOrder(node.lastElementChild);
            }
        }
    },
    postOrder(node) {
        if (node != null) {
            if (node.firstElementChild) {
                this.postOrder(node.firstElementChild);
            }
            if (node.lastElementChild) {
                this.postOrder(node.lastElementChild);
            }
            animateList.push(node);
        }
    },
    reset() {
        animateList.forEach(function (item) {
            item.className = item.className.replace('active', '');
        });
    },
    animate() {
        var i = 0;
        animateList[i].className += ' active';
        timer = setInterval(function () {
            //这里不能用箭头函数，想一想为什么
            i++;
            if (i < animateList.length) {
                //前一个结点回复平常，当前结点active
                animateList[i - 1].className = animateList[i - 1].className.replace('active', '');
                animateList[i].className += 'active';
            }
            else {
                clearInterval(timer);
                animateList[i - 1].className = animateList[i - 1].className.replace('active', '');
            }
        }, 500);
    }
};

var operation = {
    addButtonEvent() {
        addClick(preOrder, 'click', function (type) {
            clearInterval(timer);
            animateList = [];
            orderItems.preOrder(container);
            orderItems.reset();
            orderItems.animate();
        });

        addClick(inOrder, 'click', function (type) {
            clearInterval(timer);
            animateList = [];
            orderItems.inOrder(container);
            orderItems.reset();
            orderItems.animate();
        });

        addClick(postOrder, 'click', function (type) {
            clearInterval(timer);
            animateList = [];
            orderItems.postOrder(container);
            orderItems.reset();
            orderItems.animate();
        });
    },

    init() {
        this.addButtonEvent();
    }
};
operation.init();




