//封装typeof
function type(target) {
    var template = {
        "[object Number]": "number - object ",
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Boolean]": "boolean - object",
        "[object String]": "string - object",

    }
    if (target === null) {
        return null;
    } else if (typeof (target) == 'object') {//判断是不是对象
        var str = object.prototype.toString.call(target);
        return template[str]
    } else {
        return typeof (target)//判断原始值和function
    }
}