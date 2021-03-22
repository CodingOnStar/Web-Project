//封装type
//1、分两类：1.原始值 2.引用值
//2、区分引用值
function type (target) {
    var template = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number-object",
        "[object Boolean]": "boolean-object",
        "[object String]": "string-object"
    }
    if (target === null) {
        return null;
    } else if (typeof target == "object") {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return typeof (target)
    }
}
//数组去重，利用hash，在对象上做键值对。在原型链上实现
Array.prototype.unique = function () {
    var temp = {};
    var arr = [];
    len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {   //this[i]代表数组的第几位
            temp[this[i]] = 'exist'//赋值的时候要考虑非的情况下，是否是true
            arr.push(this[i])
        }
    }
    return arr;
}