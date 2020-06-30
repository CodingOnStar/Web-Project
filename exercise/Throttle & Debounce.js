//节流
//返回一个包装器，第一次调用期间，执行f，并且保存执行期间的所有参数和上下文。之后在ms后执行冷却期间的最后一次调用
function throttle(f, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        f.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

//防抖
//使用箭头函数，因为箭头函数不具有上下文。所以此时的this从wrapper获取
function wrapper(func, ms) {
    let timeout;
    clearTimeout(timeout);
    setTimeout(() => {
        func.apply(this, arguments);
    }, ms);
}