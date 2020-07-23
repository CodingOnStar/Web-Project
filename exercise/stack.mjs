//数组实现，复杂度O(n),私有属性
const items = new WeakMap();
class StackArray {
    constructor() {
        items.set(this, [])

        //this.items = [];
    }
    push(item) {
        const s = items.get(this);
        s.push(item);
    }
    pop() {
        const s = items.get(this).pop();
        return s

        //this.items.pop();
    }
    size() {
        const s = items.get(this);
        return s.length;
    }
    isEmpty() {
        const s = items.get(this);
        return s.length === 0;
    }
    peek() {
        const s = items.get(this);
        return s[s.length - 1];
    }
    clear() {
        items.delete(this);
        //this.items = [];
    }
}

//对象实现,除了toString之外，其他复杂度都为O(1)
class StackObject {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(item) {
        this.items[this.count] = item;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        let item = this.items[this.count];
        delete this.items[this.count];
        return item;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.count === 0;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1]
    }
    clear() {
        this.count = 0;
        this.items = {};
    }
    toString() {
        if (this.isEmpty()) {
            return "";
        }
        let stringObj = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            stringObj = `${stringObj},${this.items[i]}`;
        }
        return stringObj;
    }
}
//基于stack，将十进制数字实现三十六进制以下任意进制转换
function baseConverter(decNumber, base) {
    let stack = new StackArray()
    let number = decNumber
    let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let rem
    let baseString = ''

    if (!(base >= 2 && base <= 36))
        return ''
    while (number > 0) {
        rem = Math.floor(number % base)
        stack.push(rem)
        number = Math.floor(number / base)
    }
    while (!stack.isEmpty()) {
        baseString += digits[stack.pop()];
    }
    return baseString
}
// console.log(baseConverter(10, 7))
export default StackObject