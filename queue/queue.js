/*
 * @Author: Hanxu Jiang
 * @Date: 2020-04-10 14:48:09
 * @Last Modified by: Hanxu Jiang
 * @Last Modified time: 2020-04-10 16:36:00
 */

function addEventhandler(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent(event, listener);
    } else {
        element['on' + event] = listener;
    }
}

$ = function (id) {
    return document.querySelector(id);
}

window.onload = function () {

    function addDeleteEvent() {
        var items = document.getElementsByClassName('item');
        items.forEach(function (item, index) {
            addEventhandler(item, 'click', function () {
                que.deleteID(index);
            });
        });
    }

    function getInput() {
        var values = $('#input').value;
        return values.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/)
            .filter(function (item) {
                return item != '';
            });

    }

    var que = {
        str: [],
        leftPush(num) {
            [].forEach.call(num, function (item) {
                que.str.unshift(item);
            });
            this.render();
        },
        rightPush(num) {
            [].forEach.call(num, function (item) {
                que.str.push(item);
            });
            this.render();
        },
        leftPop() {
            if (!this.isEmpty()) {
                this.str.shift();
                this.render();
            } else {
                alert('Nothing to pop');
            }
        },
        rightPop() {
            if (!this.isEmpty()) {
                this.str.pop();
                this.render();
            } else {
                alert('Nothing to pop')
            }
        },
        deleteID(index) {
            this.str.splice(index, 1);
            this.render();
        },
        isEmpty() {
            return this.str.length === 0;
        },
        render: function (match) {
            $('.down').innerHTML = this.str.map(function (item) {
                if (match != null && match.length > 0) {
                    item = item.replace(new RegExp(match, "g"), '<span class="selected">' + match + '</span>');
                }
                return '<div class="item">' + item + '</div>';
            }).join('');
            addDeleteEvent();
        }
    };
    addEventhandler($('#left-in'), 'click', function () {
        que.leftPush(getInput());
    });

    addEventhandler($('#right-in'), 'click', function () {
        que.rightPush(getInput());
    });

    addEventhandler($('#left-out'), 'click', function () {
        que.leftPop();
    });

    addEventhandler($('#right-out'), 'click', function () {
        que.rightPop();
    });

    addEventhandler($('#searchBtn'), 'click', function () {
        que.render($('#search-text').value);

    });
}