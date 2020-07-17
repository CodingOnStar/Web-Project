export { ValuePair }
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}:${this.value}]`;
    }
}
class Dictionary {
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
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null
    }
    set(key, value) {
        if (key !== null & value !== null) {
            const tableKey = this.toStrFn(key)
            this.table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)]
        return valuePair == null ? undefined : valuePair.value
    }
    keyValues() {
        const valuePair = []
        for (const key in this.table) {
            if (this.hasKey(key)) {
                valuePair.push(this.table[key])
            }
        }
        return valuePair
    }
    keys() {
        return this.keyValues().map(valuePair => valuePair.key)
    }
    values() {
        return this.keyValues().map(valuePair => valuePair.value)
    }
    forEach(callbackFn) {
        const valuePair = this.keyValues()
        for (let i = 0; i < valuePair.length; i++) {
            const result = callbackFn(valuePair[i].key, valuePair[i].value)
            if (result === false) {
                break
            }
        }
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size === 0
    }
    clear() {
        this.table = {}
    }
    toString() {
        if (this.isEmpty()) {
            return ""
        }
        const valuePair = this.keyValues()
        let objString = `${valuePair[0].toString()}`
        for (let i = 0; i < valuePair.length; i++) {
            objString = `${valuePair},${valuePair[i].toString()}`
        }
        return objString
    }
}
/*const dictionary = new Dictionary()
dictionary.set("G", '1111@email.com')
dictionary.set("H", '2222@email.com')
dictionary.set("C", '3333@email.com')
console.log(dictionary.size())
console.log(dictionary.keys())
console.log(dictionary.values())
console.log(dictionary.get("G"))
dictionary.forEach((k, v) => {
    console.log('forEach', `key:${k}, value:${v}`)
})*/