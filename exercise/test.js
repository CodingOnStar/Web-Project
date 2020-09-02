/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const list = []
    list.push({ num: n, step: 0 })
    const visitedObj = { [n]: true }
    while (list.length > 0) {
        const { num, step, visited } = list.shift()
        for (let i = 1; ; i++) {
            const extraNum = num - i * i
            if (extraNum < 0) break
            // this line return the result in advance, it reduces perform time very much.
            if (extraNum === 0) return step + 1
            if (!visitedObj[extraNum]) {
                visitedObj[extraNum] = true
                list.push({ num: num - i * i, step: step + 1 })
            }
        }
    }
}
console.log(numSquares(12))
