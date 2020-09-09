//对于非symbol、funtion和undefined对象时，可以使用JSON.stringify()和JSON.parse进行深拷贝
//其余情况
function deepClone (obj) {
    const targetObj = obj.constructor === Array ? [] : {}
    for (let keys in obj) {
        if (obj.hasOwnProperty(keys)) {
            if (obj[keys] && typeof obj[keys] === "object") {
                targetObj[keys] = obj[keys].constructor === Array ? [] : {}
                targetObj[keys] = deepClone(obj[keys])
            } else {
                targetObj[keys] = obj[keys]
            }
        }
    }
    return targetObj
}