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


console.log(fibonacciObj(5))