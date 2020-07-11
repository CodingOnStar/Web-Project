//数组实现
class StackArray {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        this.items.pop();
    }
    size() {
        return this.items.length;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    clear() {
        this.items = [];
    }
}
//对象实现
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
        this.count--;
        let item = this.items[this.count];
        delete this.items[this.count];
        return item;
    }
    size() {
        return this.items.count;
    }
    isEmpty() {
        return this.items.count === 0;
    }
    peek() {
        return this.items[this.count - 1]
    }
    clear() {
        this.count = 0;
        this.items = {};
    }
}