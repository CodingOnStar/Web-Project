/*实现深层克隆(引用值也互相不影响)
遍历对象：
1.判断是否是原始值（typeof和toString方法）
2.判断是数组还是对象
3.建立相应的数组或者对象
4.递归实现 */
function deepClone(origin, target) {
    var target = target || {};
    toStr = Object.prototype.toString();
    arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin[prop] !== "null" && origin.hasOwnProperty(prop)) {
            if (typeof origin[prop] === "object") {
                if (toStr.call(origin[prop]) == arrStr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                //此处可以修改为三步运算符（target[prop] = toStr.call(origin[prop]) == arrStr ? []:{};）
                deepClone(origin[prop], target[prop]);
            }
            else {
                target[prop] = origin[prop];
            }
        }
    }
}