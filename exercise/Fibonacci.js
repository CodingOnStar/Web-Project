/*https://ruanyifeng.com/blog/2015/04/tail-call.html
关于尾调用优化*/

function fibonacciMemoization(n) {
    const memo = [0, 1]
    const fibonacci = (n) => {
        if (memo[n] != null) return memo[n]
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    }
    return fibonacci
}
const fibonacci = (function () {
    const f = [0];
    return function (n) {
        if (f[n] !== undefined) return f[n];
        return f[n] = (n === 1 || n === 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2))
    }
})()
//上面的函数，当n很大时，会填充数组为undefined
//下面函数使用对象解决数组的问题
const fibonacciObj = (function () {
    const f = {}
    return function (n) {
        if (n === 0 || n === 1) {
            return n
        }
        if (f[n - 2] === undefined) {
            f[n - 2] = fibonacci(n - 2)
        }
        if (f[n - 1] === undefined) {
            f[n - 1] = fibonacci(n - 1)
        }
        return f[n] = f[n - 1] + f[n - 2]
    }
})()
//为了减少闭包的使用，可以把f作为属性
const fibonacci = (n) => {
    // 创建缓存
    if (!fibonacci.f) { fibonacci.f = {} };
    // 计算
    if (n === 0 || n === 1) {
        return n
    }
    if (fibonacci.f[n - 2] === undefined) {
        fibonacci.f[n - 2] = fibonacci(n - 2)
    }
    if (fibonacci.f[n - 1] === undefined) {
        fibonacci.f[n - 1] = fibonacci(n - 1)
    }
    return fibonacci.f[n] = fibonacci.f[n - 1] + fibonacci.f[n - 2]
}
//解构赋值
const fibonacci = (n) => {
    let a = 0;
    let b = 1;
    let i = 1;
    while (i++ <= n) {
        [a, b] = [b, a + b]
    }
    return a;
}


console.log(fibonacciObj(5))