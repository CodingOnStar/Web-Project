/*
 * @Author: Hanxu Jiang 
 * @Date: 2020-03-27 20:52:32 
 * @Last Modified by: Hanxu Jiang
 * @Last Modified time: 2020-03-27 22:01:13
 */
var timer = null;
var animateList = [];
var container = document.querySelector('.container');
var preOrder = document.querySelector('#preOrder');
var inOrder = document.querySelector('#inOrder');
var postOrder = document.querySelector('#postOrder');


//add Event
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
(function () {
    var orderItems = {
        preOrder: function (node) {
            while (node) {
                animateList.push(node);
                if (node.firstElementChild) {
                    this.preOrder(node.firstElementChild);
                }
                if (node.lastElementChild) {
                    this.preOrder(node.lastElementChild);
                }
            }
        },
        inOrder: function (node) {
            while (node) {
                if (node.firstElementChild) {
                    this.inOrder(node.firstElementChild);
                }

                animateList.push(node);

                if (node.lastElementChild) {
                    this.inOrder(node.lastElementChild);
                }
            }
        },
        postOrder: function (node) {
            while (node) {
                if (node.firstElementChild) {
                    this.postOrder(node.firstElementChild);
                }
                if (node.lastElementChild) {
                    this.postOrder(node.lastElementChild);
                }
                animateList.push(node);
            }
        },
        reset: function () {
            animateList.forEach(function (item) {
                item.className = item.className.replace('active', '');
            });
        },
        animate: function () {
            var i = 0;
            animateList[i].className += ' active';
            timer = setInterval((e) => {
                i++;
                if (i < animateList.length) {
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
        addButtonEvent: function () {
            addHandler(preOrder, 'click', function (type) {
                clearInterval(timer);
                animateList = [];
                orderItems.preOrder(container);
                orderItems.reset();
                orderItems.animate();
            });

            addHandler(inOrder, 'click', function (type) {
                clearInterval(timer);
                animateList = [];
                orderItems.inOrder(container);
                orderItems.reset();
                orderItems.animate();
            });

            addHandler(postOrder, 'click', function (type) {
                clearInterval(timer);
                animateList = [];
                orderItems.postOrder(container);
                orderItems.reset();
                orderItems.animate();
            });
        },

        init: function () {
            this.addButtonEvent();
        }
    };
    operation.init();
})()



