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