const Compare = { LESS_THAN: -1, BIGGER_THAN: 1 }
function defaultCompareFn(a, b) {
    if (a === b) { return 0 }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}
function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]
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
function heapSort(A) {
    // 初始化大顶堆，从第一个非叶子结点开始
    for (let i = Math.floor(A.length / 2 - 1); i >= 0; i--) {
        shiftDown(A, i, A.length);
    }
    // 排序，每一次for循环找出一个当前最大值，数组长度减一
    for (let i = Math.floor(A.length - 1); i > 0; i--) {
        swap(A, 0, i); // 根节点与最后一个节点交换
        shiftDown(A, 0, i); // 从根节点开始调整，并且最后一个结点已经为当
        // 前最大值，不需要再参与比较，所以第三个参数
        // 为 i，即比较到最后一个结点前一个即可
    }
}
function shiftDown(A, i, length) {
    let temp = A[i]; // 当前父节点
    // j<length 的目的是对结点 i 以下的结点全部做顺序调整
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
        temp = A[i];  // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
        if (j + 1 < length && A[j] < A[j + 1]) {
            j++;   // 找到两个孩子中较大的一个，再与父节点比较
        }
        if (temp < A[j]) {
            swap(A, i, j) // 如果父节点小于子节点:交换；否则跳出
            i = j;  // 交换后，temp 的下标变为 j
        } else {
            break;
        }
    }
}
const array = [7, 6, 3, 5, 4, 1, 2]
heapSort(array)
console.log(array)