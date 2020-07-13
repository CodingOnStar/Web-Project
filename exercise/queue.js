class Queue {
    constructor() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        if (this.isEmpty()) {
            this.clear();
        }
        return result;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount]
    }
    size() {
        return this.count - this.lowestCount
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString
    }
}
class Deque {
    constructor() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    addBack(element) {
        this.items[this.count] = element;
        this.count++;
    }
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element);
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count]
        delete this.items[this.count]
        if (this.isEmpty()) {
            this.clear();
        }
        return result;
    }
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount]
    }
    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1]
    }
    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    size() {
        return this.count - this.lowestCount
    }
    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString
    }
}
//击鼓传花模拟
function hotPotato(elementSList, num) {
    const queue = new Queue()
    const eliminatedList = []
    for (let i = 0; i < elementSList.length; i++) {
        queue.enqueue(elementSList[i])
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminatedList.push(queue.dequeue())
    }
    return {
        eliminatedList: eliminatedList,
        winner: queue.dequeue()
    }
}
function palindromeChecker(aString) {
    let reg = /[0-9A-Z]+/gi
    if (!reg.test(aString)) {
        return false
    }
    const deque = new Deque()
    const lowerString = aString.toLocaleLowerCase()
    let isEqual = true
    let firstChar, lastChar
    for (let i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i))
    }
    while (deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront();
        lastChar = deque.removeBack();
        if (firstChar !== lastChar) {
            isEqual = false
        }
    }
    return isEqual
}
console.log('kayak', palindromeChecker('kayyak'))
