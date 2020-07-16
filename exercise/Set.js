class Set {
    constructor() {
        this.items = {}
    }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element)
    }
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element
            return true
        }
        return false
    }
    delete(element) {
        if (this.has(element)) {
            delete this.items[element]
            return true
        }
        return false
    }
    clear() {
        this.items = {}
    }
    size() {
        return Object.keys(this.items).length
    }
    values() {
        return Object.values(this.items)
    }
    union(otherSet) {
        let unionSet = new Set()
        this.values().forEach(value => unionSet.add(value))
        otherSet.forEach(value => unionSet.add(value))
        return unionSet
    }
    intersection(otherSet) {
        let intersectionSet = new Set()
        if (this.values().length > otherSet.values().length) {
            biggerSet = this.values()
            smallerSet = otherSet.values()
        }
        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        })
        return intersectionSet
    }
    difference(otherSet) {
        let differenceSet = new Set()
        if (this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value)
            }
        }))
            return differenceSet
    }
    isSubsetOf(otherSet) {
        if (this.values().length > otherSet.values().length) {
            return false
        } else {
            let subSet = true
            this.values().every(value => {
                if (!otherSet.has(value)) {
                    subSet = false
                    return false
                }
                return true
            })
            return subSet
        }
    }
}
