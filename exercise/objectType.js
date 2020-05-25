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
    }
    if (typeof (target) == 'function') {
        return 'function';
    } else if (typeof (target) == 'object') {
        var str = object.prototype.toString.call(target);
        return template[str]
    } else {
        return typeof target
    }
}