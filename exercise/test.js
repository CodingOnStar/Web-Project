/* function add (a, b) {
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

Function.prototype.a = 'Function';
Object.prototype.a = 'Object';

function Person () { };
var child = new Person();
console.log(Person.a);
console.log(child.a);
console.log(child.__proto__.__proto__.constructor.constructor.constructor);
*/

class Sleep {
    constructor(timeout) {
        this.timeout = timeout;
    }
    then (resolve, reject) {
        const startTime = Date.now();
        setTimeout(
            () => resolve(Date.now() - startTime),
            this.timeout
        );
    }
}

(async () => {
    const sleepTime = await new Sleep(1000);
    console.log(sleepTime);
})();