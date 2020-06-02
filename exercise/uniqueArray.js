//原理：把数组中的每一项放入对象中，因为对象中的属性也不能重复，所以根据不同的数组项在对象中建立对应的属性
Array.prototype.unique = function () {
    var temp = {}, arr = [], len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = "exist";//随便赋一个值，创建这个属性
            arr.push(this[i]);
        }
    }
    return arr;
}