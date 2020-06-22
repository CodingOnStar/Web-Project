class Collection {
    constructor() {
        this.items = [];
    }
    *[Symbol.iterator]() {
        yield* this.items.values();
    }
}
var collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let i of collection) {
    console.log(i);
}