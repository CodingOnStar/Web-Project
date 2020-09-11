function add (a, b) {
    return a + b
}
var curry = function (fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
        var newArgs = args.concat([].slice.call(arguments))
        //此时的arguments是return的function的arguments
        return fn.apply(this, newArgs)
    }
}
var addCurry = curry(add, 1, 2);
addCurry() // 3
//或者
var addCurry = curry(add, 1);
addCurry(2) // 3
//或者
var addCurry = curry(add);
addCurry(1, 2) // 3
console.log(addCurry()) // 3
