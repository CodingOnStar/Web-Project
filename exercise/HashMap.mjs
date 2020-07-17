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
                if (current.element.key === key) { //删除的是第一个，所以这个if条件可加可不加
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
const hash = new HashTableSeparateChaining()
hash.put("1", "111")
hash.put("2", "222")
hash.put("3", "333")
hash.put("4", "444")
hash.put("1", "111-222")
hash.put("2", "222-222")
hash.remove("1")
console.log(hash.table[12])