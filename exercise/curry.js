// join :: String -> [String] -> String
const join = curry((sep, arr) => arr.join(sep));
// strLen :: String -> Number
const strLen = str => str.length;
const compose = (f, g) => x => f(g(x))
function curry (fn, args) {
    var length = fn.length;

    args = args || [];

    return function () {

        var _args = args.slice(0),

            arg, i;

        for (i = 0; i < arguments.length; i++) {

            arg = arguments[i];

            _args.push(arg);

        }
        if (_args.length < length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}

//sub_curry 的作用就是用函数包裹原函数，然后给原函数传入之前的参数，当执行 fn0(...)(...) 的时候，执行包裹函数，返回原函数，然后再调用 sub_curry 再包裹原函数，然后将新的参数混合旧的参数再传入原函数，直到函数参数的数目达到要求为止。

const joinDash = join('-');
const lengthWithDash = compose(strLen, joinDash);
console.log(lengthWithDash(['abc', 'def']));  // 7
