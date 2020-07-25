var MyCircularQueue = function (k) {
    this.items = {}
    this.tail = 0
    this.head = 0
    this.size = k
};
MyCircularQueue.prototype.enQueue = function (value) {
    if (this.isEmpty()) {
        this.tail++
        this.head++
        this.items[this.tail] = value
        return true
    } else if (this.isFull()) {
        return false
    } else {
        this.tail++
        this.items[this.tail] = value

        return true
    }
};


MyCircularQueue.prototype.deQueue = function () {
    if (this.isEmpty()) {
        return false
    } else {
        delete this.items[this.head]
        if (this.head === this.tail) {
            this.head = this.tail = 0
        } else {
            this.head++
        }
        return true
    }
};


MyCircularQueue.prototype.Front = function () {
    if (this.isEmpty()) {
        return -1
    } else {
        return this.items[this.head]
    }
};


MyCircularQueue.prototype.Rear = function () {
    if (this.isEmpty()) {
        return -1
    } else {
        return this.items[this.tail]
    }
};


MyCircularQueue.prototype.isEmpty = function () {
    if (this.tail == 0 && this.head == 0) {
        return true
    }
    return false
};


MyCircularQueue.prototype.isFull = function () {
    if (this.tail - this.head == this.size - 1) {
        return true
    } else {
        return false
    }
};