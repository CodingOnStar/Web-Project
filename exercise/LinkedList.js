class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}
class LinkedList {
    constructor() {
        this.count = 0;
        this.head = null;
    }
    exqualFn(a, b) {
        return a === b
    }
    push(element) {
        let node = new Node(element)
        let current;
        if (this.head == null) {
            this.head = node
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next
            }
            current.next = node;
        }
        this.count++;
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            for (let i = 0; i < index && current != null; i++) {
                current = current.next;
            }
            return current
        }
        return undefined;
    }
    removeAt(index) {
        let current
        if (index === 0) {
            this.head = this.head.next
        } else {
            const previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
        }
        this.count--;
    }
    insert(element, index) {
        if (index >= 0 && index < this.count) {
            const node = new Node(element)
            if (index === 0) {
                node.next = this.head
                this.head = node
            } else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.exqualFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }
    remove(element) {
        let index = this.indexOf(element)
        return this.removeAt(index)
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.size() === 0
    }
    getHead() {
        return this.head
    }
    toString() {
        if (this.head == null) {
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        for (let i = 0; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`
            current = current.next
        }
        return objString
    }
}
class DoublyNodes extends Node {
    constructor(element, next, prev) {
        super(element, next)
        this.prev = prev
    }
}
class DoublyLinkedList extends LinkedList {
    constructor() {
        this.tail = undefined
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNodes(element)
            let current = this.head
            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    this.head.prev = node
                    this.head = node
                }
            } else if (index === this.count) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                node.next.prev = node
                previous.next = node
                node.prev = previous
            }
            this.count++
            return true
        }
        return false
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
                if (this.count === 1) {
                    this.tail = undefined
                } else {
                    this.head.prev = undefined
                }
            } else if (index === this.count - 1) {
                current = this.tail
                this.tail = current.prev
                this.tail.next = undefined
            } else {
                current = this.getElementAt(index)
                const previous = current.prev
                previous.next = current.next
                current.next.prev = previous
            }
            this.count--
            return current.element
        }
        return undefined
    }
}
class CircularLinkedList extends LinkedList {
    constructor() {
        super()
    }
    insert(element, index) {
        if (index >= 0 && index < this.count) {
            const node = new Node(element)
            let current = this.head
            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    node.next = this.head
                } else {
                    node.next = this.head
                    current = this.getElementAt(this.size())
                    this.head = node
                    current.next = this.head
                }
            } else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
        }
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined
                } else {
                    const removed = this.head
                    this.head = removed.next
                    current = this.getElementAt(this.size())
                    current.next = removed
                    current = removed
                }
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
}
class SortedLink extends LinkedList {
    constructor() {
        super()
        this.compare = { LESS_THAN: -1, BIGGER_THAN: 1 }
    }
    compareFn(a, b) {
        if (a === b) { return 0 }
        return a < b ? this.compare.LESS_THAN : this.compare.BIGGER_THAN
    }
    getIndexNextSortedElement(element) {
        let current = this.head
        for (let i = 0; i < this.count && current; i++) {
            const comp = this.compareFn(element, current.element)
            if (comp === this.compare.LESS_THAN) {
                return i
            }
            current = current.next
        }
        return i
    }
    insert(element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, 0)
        }
        const pos = this.getIndexNextSortedElement(element)
        return super.insert(element, pos)
    }
}
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList()
    }
    push(element) {
        this.items.push(element)
    }
    pop() {
        if (this.isEmpty()) {
            return ""
        } else {
            return this.items.removeAt(this.size())
        }
    }
    peek() {
        if (this.isEmpty()) {
            return ""
        }
        return this.items.getElementAt(this.size() - 1).element
    }
    clear() {
        this.items.clear()
    }
    isEmpty() {
        return this.items.isEmpty()
    }
    size() {
        return this.items.size()
    }
    toString() {
        return this.items.toString()
    }
}