const Compare = { LESS_THAN: -1, BIGGER_THAN: 1 }
function defaultCompareFn(a, b) {
    if (a === b) { return 0 }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}
class MinHeap {
    constructor(compareFn = defaultCompareFn) {
        this.heap = []
        this.compareFn = compareFn
    }
    getLeftIndex(index) {
        return index * 2 + 1
    }
    getRightIndex(index) {
        return index * 2 + 2
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined
        } else {
            return Math.floor((index - 1) / 2)
        }
    }
    insert(value) {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }
    siftUp(index) {
        let parent = this.getParentIndex(index)
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
            this.swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }
    swap(array, a, b) {
        [array[a], array[b]] = [array[b], array[a]]
    }
    size() {
        return this.heap.length
    }
    isEmpty() {
        return this.size() === 0
    }
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]
    }
    extract() {
        if (this.isEmpty()) {
            return undefined
        }
        if (this.size() === 1) {
            return this.heap.shift()
        }
        const removedValue = this.heap.shift()
        this.heap.unshift(this.heap.pop())
        this.siftDown(0)
        return removedValue
    }
    siftDown(index) {
        let element = index
        let left = this.getLeftIndex(index)
        let right = this.getRightIndex(index)
        let size = this.size()
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
            element = left
        }
        if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {//对比左右子节点的大小，此时element已经是left了
            element = right
        }
        if (index !== element) {
            this.swap(this.heap, index, element)
            this.siftDown(element)
        }
    }
}
function reverseCompare(defaultCompareFn) {
    return (a, b) => defaultCompareFn(b, a)
}
class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompareFn) {
        super(compareFn)
        this.compareFn = reverseCompare(compareFn)
    }
}

const heap = new MaxHeap()
heap.insert(2)
heap.insert(3)
heap.insert(4)
heap.insert(5)
heap.insert(1)
console.log(heap.size())
console.log(heap)