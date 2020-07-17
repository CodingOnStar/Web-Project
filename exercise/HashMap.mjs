import { LinkedList } from './LinkedList.mjs'
import { ValuePair } from './Map.mjs'

class HashMap {
    constructor() {
        this.table = {}
    }
    toStrFn(item) {
        if (item === null) {
            return "NULL"
        } else if (item === undefined) {
            return "UNDEFINED"
        } else if (typeof item === 'string' || item instanceof String) {
            return `${item}`
        } else {
            return item.toString()
        }
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key
        } else {
            const tableKey = this.toStrFn(key)
            let hash = 0
            for (let i = 0; i < tableKey.length; i++) {
                hash += tableKey.charCodeAt(i)
            }
            return hash % 37
        }
    }
    hashCode(key) {
        return this.loseloseHashCode(key)
    }
    //更好的散列函数
    djb2HashCode(key) {
        let hash = 5381
        const tableKey = this.toStrFn(key)
        for (let i = 0; i < tableKey.length; i++) {
            hash = hash * 33 + tableKey.charCodeAt(i)
        }
        return hash % 1013
    }
    push(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key)
            this.table[position] = new ValuePair(key, value)
            return true
        }
        return false
    }
    get(key) {
        const valuePair = this.table[this.hashCode(key)]
        return valuePair == null ? undefined : valuePair.value
    }
    remove(key) {
        const valuePair = this.table[this.hashCode(key)]
        if (!valuePair == null) {
            delete this.table[this.hashCode(key)]
            return true
        }
        return false
    }
}
class HashTableSeparateChaining extends HashMap {
    constructor() {
        super()
        this.table = {}
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key)
            if (this.table[position] == null) {
                this.table[position] = new LinkedList()
            }
            this.table[position].push(new ValuePair(key, value))
            return true
        }
        return false
    }
    get(key) {
        const position = this.hashCode(key)
        const linkedList = this.table[position]
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead()
            while (current != null) {
                if (current.element.key === key) {
                    return current.element.value
                }
                current = current.next
            }
        }
    }
    remove(key) {
        const position = this.hashCode(key)
        const linkedList = this.table[position]
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead()
            while (current != null) {
                if (current.element.key === key) {
                    linkedList.remove(current.element)
                    if (linkedList.isEmpty()) {
                        delete this.table[position]
                    }
                    return true
                }
                current = current.next
            }
        }
        return false
    }
}
class HashTableLinearDetector extends HashMap {
    constructor() {
        super()
        this.table = {}
    }
    push(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key)
            if (this.table[position] == null) {
                this.table[position] = new ValuePair(key, value)
            } else {
                let index = position + 1
                while (this.table[index] != null) {
                    index++
                }
                this.table[index] = new ValuePair(key, value)
            }
            return true
        }
        return false
    }
    get(key) {
        const position = this.hashCode(key)
        if (this.table[position] != null) {
            if (this.table[position].key === key)
                return this.table[position]
        } else {
            let index = position + 1
            while (this.table[index] != null && this.table[index].key !== key) {
                index++
            }
            if ((this.table[index] != null && this.table[index].key === key)) {
                return this.table[index].value
            }
        }
        return undefined
    }
    verifyRemove(key, removedPosition) {
        const hash = this.hashCode(key)
        let index = removedPosition + 1
        while (this.table[index != null]) {
            const postHash = this.hashCode(this.table[index].key)
            if (postHash <= hash || postHash <= removedPosition) {
                this.table[removedPosition] = this.table[index]
                delete this.table[index]
                removedPosition = index
            }
            index++
        }
    }
    remove(key) {
        const position = this.hashCode(key)
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                delete this.table[position]
                this.verifyRemove(key, position)
                return true
            }

            let index = position + 1
            while (this.table[index] != null && this.table[index].key !== key) {
                index++
            }
            if ((this.table[index] != null && this.table[index].key === key)) {
                delete this.table[index]
                this.verifyRemove(key, position)
                return true
            }
        }
        return false
    }
}

const hash = new HashTableSeparateChaining()
hash.put("Jonathan", "111")
hash.put("2", "222")
hash.put("3", "333")
hash.put("4", "444")
hash.put("Jamie", "111-222")
hash.put("2", "222-222")
hash.remove("Jamie")
console.log(hash.table[5])